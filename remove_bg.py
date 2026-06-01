import collections
from PIL import Image

def remove_background(img_path, output_path):
    print("Carregando imagem...")
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    visited = set()
    
    # Limiar de distância de cor (threshold)
    # Aumentamos ligeiramente para garantir que pixels ligeiramente acinzentados perto dos equipamentos também sumam
    threshold = 50.0 
    
    def get_dist(c1, c2):
        return ((c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 + (c1[2]-c2[2])**2)**0.5
        
    queue = collections.deque()
    
    # Adiciona os pontos das bordas externas como sementes do floodfill
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(1, height - 1):
        queue.append((0, y))
        queue.append((width - 1, y))
        
    for pt in queue:
        visited.add(pt)
        
    # BFS para flood fill
    print("Processando pixels (Flood Fill)...")
    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]
        
        # Se for quase branco, tornamos transparente
        if get_dist((r, g, b), (255, 255, 255)) < threshold:
            pixels[x, y] = (r, g, b, 0)
            
            # Checa vizinhos (4-conectividade)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height:
                    if (nx, ny) not in visited:
                        nr, ng, nb, na = pixels[nx, ny]
                        if get_dist((nr, ng, nb), (255, 255, 255)) < threshold:
                            visited.add((nx, ny))
                            queue.append((nx, ny))
                            
    # Opcional: suavização de bordas (anti-aliasing básico)
    # Podemos percorrer pixels adjacentes aos transparentes e suavizar se necessário,
    # mas o drop-shadow no CSS e o redimensionamento do navegador já suavizam as bordas muito bem.
    
    print("Salvando imagem processada...")
    img.save(output_path, "PNG")
    print("Background removido com sucesso!")

if __name__ == "__main__":
    remove_background("assets/hero-equipamentos.png", "assets/hero-equipamentos.png")
