// export const requests = {
//     createMap: " http://localhost:5000/api/mindmaps",
//     deleteMap: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
//     fetchAllMaps: "http://localhost:5000/api/mindmaps",
//     fetchMap: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
//     saveMap: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
//     titleChange: (mapId : String) => `http://localhost:5000/api/mindmaps/${mapId}`,
//     login: "http://localhost:5000/api/auth/",
//     register: "http://localhost:5000/api/auth/register",
// }


const baseUrl = "https://mind-map-ivory.vercel.app";
export const requests = {
    createMap: `${baseUrl}/mindmaps`,
    deleteMap: (mapId : String) => `${baseUrl}/mindmaps/${mapId}`,
    fetchAllMaps: `${baseUrl}/mindmaps`,
    fetchMap: (mapId : String) => `${baseUrl}/mindmaps/${mapId}`,
    saveMap: (mapId : String) => `${baseUrl}/mindmaps/${mapId}`,
    titleChange: (mapId : String) => `${baseUrl}/mindmaps/${mapId}`,
    login: `${baseUrl}/auth/`,
    register: `${baseUrl}/auth/register`,
}