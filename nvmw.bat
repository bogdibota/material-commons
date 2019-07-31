set /p node_version=< .nvmrc
nvm install %node_version%
nvm use %node_version%
