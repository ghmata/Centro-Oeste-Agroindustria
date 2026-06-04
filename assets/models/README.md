# Modelos 3D dos Equipamentos (GLB/GLTF)

Este diretório deve conter os modelos 3D dos equipamentos no formato `.glb` ou `.gltf`.

## Arquivos esperados

| Equipamento | Arquivo Esperado |
|---|---|
| Rosca Transportadora Tipo Calha | `rosca-calha.glb` |
| Rosca Transportadora Tipo Chupim | `rosca-chupim.glb` |
| Elevador de Canecas | `elevador-canecas.glb` |
| Misturador Horizontal | `misturador-horizontal.glb` |
| Misturador Vertical | `misturador-vertical.glb` |

## Instruções

1. Coloque os arquivos `.glb` neste diretório
2. Atualize o campo `model3d` de cada equipamento em `data/site-data.js`
3. O `<model-viewer>` carregará automaticamente os modelos

## Formato recomendado

- **GLB** (binário) — menor tamanho, carregamento mais rápido
- Compressão **Draco** ou **MeshOpt** para reduzir o tamanho
- Tamanho máximo recomendado: ~5MB por modelo
