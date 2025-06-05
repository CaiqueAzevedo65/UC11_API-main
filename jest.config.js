module.exports = {
    testEnvironment: "node", // define o ambiente como node
    testMatch: ["**/__tests__/**/*.test.js"], // define os arquivos de teste
    collectCoverageFrom: ["**/*.js","!**/node_modules/**","!**/coverage/**"], // define os arquivos serem ignorados
    setupFilesAfterEnv: ["./__tests__/setup.js"], // define o arquivo de configurações que será executado   
};