const { json } = require('body-parser');
const redis = require('redis'); 
const config = require('../config/keys');
const { promisify } = require("util"); 

// class Redis{
//     constructor(){
//         this.client = null; 
//         this.connected = false; 
//     }
//     getConnection(){
//         if (!this.connected){
//             this.client = redis.createClient(config.REDIS_URL)
//             this.client.on('error', () => {
//                 console.log('Error connecting')
//             })
//             this.client.on('connect', () => {
//                 console.log('connected to redis')
//             })
//             return this.client
//         } 
//         else return this.client
//     }

//     setObject(key, value){
//         client.set(key, JSON.stringify(value))
//     }
//     getObject(key){
//         const val = client.get(key)
//         if (!val) return false
//         else return val 
//     }
// }

const client = () => {
    const client = redis.createClient(config.REDIS_URL)
    client.on('error', () => {
        console.log('error connecting')
    })
    client.on('connect', () => {
        console.log('connected to redis')
    })

    let get = promisify(client.get).bind(client);
    return {
        setObject: (key, value) => {
            client.set(key, JSON.stringify(value))
        }, 
        getObject: async (key) => {
            return new Promise(async (resolve, reject) => {
                const values = await get(key)
                if(!values) return false
                resolve(JSON.parse(values))
            })
            .catch(err => {
                return err
            })
        }
    }
}


module.exports = client()