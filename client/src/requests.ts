export const requests = {
    createMap: " http://localhost:5000/api/mindmaps",
    deleteMap: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
    fetchAllMaps: "http://localhost:5000/api/mindmaps",
    fetchMap: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
    saveMap: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
    titleChange: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
    login: "http://localhost:5000/api/auth/",
    register: "http://localhost:5000/api/auth/register",
}