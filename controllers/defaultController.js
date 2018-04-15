const axios = require('axios');
const path = require('path');

// exports.index = (req, res) => {
//     axios.get("https://pastebin.com/raw/PVCbgw6t")
//         .then(function(response) {
//             res.render(path.resolve('views/pages/index.ejs'), {
//              trucks: response.data.trucks
//             });
//         })
//         .catch(function(error) {
//             console.log(error);
//             res.send('An Error Occurred');
//         });
// };

exports.index = (req, res) => {
    const trucks = {
        "trucks": [{
            "stops": [{
                "arrival": 1523752015,
                "departure": 1523756035,
                "lat": 34.00058581861069,
                "lon": -118.42367617885051
            }, {
                "arrival": 1523757175,
                "departure": 1523761855,
                "lat": 33.992388925228944,
                "lon": -118.41497906732975
            }, {
                "arrival": 1523763355,
                "departure": 1523766235,
                "lat": 34.01875370037943,
                "lon": -118.41373559548897
            }, {
                "arrival": 1523767615,
                "departure": 1523770435,
                "lat": 34.02076001704243,
                "lon": -118.44666878232786
            }, {
                "arrival": 1523771515,
                "departure": 1523776495,
                "lat": 34.031644205878656,
                "lon": -118.41697577959555
            }, {
                "arrival": 1523777935,
                "departure": 1523780035,
                "lat": 34.03473577784769,
                "lon": -118.42136992417147
            }, {
                "arrival": 1523780635,
                "departure": 1523784715,
                "lat": 34.01120285260697,
                "lon": -118.45682642539757
            }, {
                "arrival": 1523785435,
                "departure": 1523789935,
                "lat": 34.029578616523764,
                "lon": -118.45055122516693
            }],
            "revenue": 1468,
            mealKits: [{
                name: 'Seared Scallops',
                image: '/img/meals/seared-scallops.png',
                quantity: 12,
                price: 15.99
            }, {
                name: 'Steak Asparagus',
                image: '/img/meals/steak-asparagus.png',
                quantity: 6,
                price: 18.99
            }, {
                name: 'Vegetable Ramen',
                image: '/img/meals/vegetable-ramen.png',
                quantity: 14,
                price: 14.99
            }, {
                name: 'Vegetable Medly',
                image: '/img/meals/vegetable-medley.png',
                quantity: 24,
                price: 12.99
            }],
            inventory: [{
                name: 'Steak',
                image: '/img/inventory/steak.png',
                quantity: 18,
                price: 7.99
            }, {
                name: 'Asparagus',
                image: '/img/inventory/asparagus.png',
                quantity: 35,
                price: 2.99
            }, {
                name: 'Bell Peppers',
                image: '/img/inventory/bell-pepper.png',
                quantity: 16,
                price: 0.99
            }, {
                name: 'Potatoes',
                image: '/img/inventory/potatoe.png',
                quantity: 24,
                price: 3.99
            }, {
                name: 'Eggplant',
                image: '/img/inventory/eggplant.png',
                quantity: 5,
                price: 1.29
            }, {
                name: 'Lemon',
                image: '/img/inventory/lemon.png',
                quantity: 22,
                price: 0.55
            }],
            driver: "Billie Anderson",
            "title": "Van 3284"
        }, {
            "stops": [{
                "arrival": 1523752015,
                "departure": 1523756575,
                "lat": 34.01159654439298,
                "lon": -118.44302585255778
            }, {
                "arrival": 1523757775,
                "departure": 1523762995,
                "lat": 34.005463603215915,
                "lon": -118.44205219672669
            }, {
                "arrival": 1523764315,
                "departure": 1523768035,
                "lat": 34.02363783295921,
                "lon": -118.43546888623332
            }, {
                "arrival": 1523768815,
                "departure": 1523772955,
                "lat": 34.04866911925925,
                "lon": -118.41980857326107
            }, {
                "arrival": 1523773615,
                "departure": 1523776915,
                "lat": 34.02846785419622,
                "lon": -118.39988786673034
            }, {
                "arrival": 1523777815,
                "departure": 1523780335,
                "lat": 34.02744267321532,
                "lon": -118.39809359464341
            }, {
                "arrival": 1523781115,
                "departure": 1523787055,
                "lat": 34.01372921837304,
                "lon": -118.38110421205637
            }],
            "revenue": 1638,
            mealKits: [{
                name: 'Seared Scallops',
                image: '/img/meals/seared-scallops.png',
                quantity: 2,
                price: 15.99
            }, {
                name: 'Steak Asparagus',
                image: '/img/meals/steak-asparagus.png',
                quantity: 4,
                price: 18.99
            }, {
                name: 'Vegetable Ramen',
                image: '/img/meals/vegetable-ramen.png',
                quantity: 6,
                price: 14.99
            }, {
                name: 'Vegetable Medly',
                image: '/img/meals/vegetable-medley.png',
                quantity: 11,
                price: 12.99
            }],
            inventory: [{
                name: 'Scallops',
                image: '/img/inventory/scallops.png',
                quantity: 7,
                price: 6.49
            }, {
                name: 'Udon Noodles',
                image: '/img/inventory/udon-noodles.png',
                quantity: 11,
                price: 1.99
            }, {
                name: 'Steak',
                image: '/img/inventory/steak.png',
                quantity: 18,
                price: 7.99
            }, {
                name: 'Asparagus',
                image: '/img/inventory/asparagus.png',
                quantity: 35,
                price: 2.99
            }, {
                name: 'Bell Peppers',
                image: '/img/inventory/bell-pepper.png',
                quantity: 16,
                price: 0.99
            }, {
                name: 'Potatoes',
                image: '/img/inventory/potatoe.png',
                quantity: 24,
                price: 3.99
            }, {
                name: 'Eggplant',
                image: '/img/inventory/eggplant.png',
                quantity: 5,
                price: 1.29
            }, {
                name: 'Lemon',
                image: '/img/inventory/lemon.png',
                quantity: 22,
                price: 0.55
            }],     
            driver: "James Gallagher",
            "title": "Van 4286"
        }, {
            "stops": [{
                "arrival": 1523752015,
                "departure": 1523756275,
                "lat": 34.050930116569894,
                "lon": -118.39999857894132
            }, {
                "arrival": 1523757595,
                "departure": 1523761135,
                "lat": 34.03385916121295,
                "lon": -118.42005114683307
            }, {
                "arrival": 1523762095,
                "departure": 1523769235,
                "lat": 34.017859899946835,
                "lon": -118.38839218936201
            }, {
                "arrival": 1523770315,
                "departure": 1523774875,
                "lat": 34.046494470716624,
                "lon": -118.34668873008707
            }, {
                "arrival": 1523775355,
                "departure": 1523781295,
                "lat": 34.001931130847545,
                "lon": -118.37323340541738
            }, {
                "arrival": 1523781895,
                "departure": 1523784775,
                "lat": 34.01720226392506,
                "lon": -118.3513834425487
            }],
            "revenue": 1789,
            mealKits: [{
                name: 'Seared Scallops',
                image: '/img/meals/seared-scallops.png',
                quantity: 0,
                price: 15.99
            }, {
                name: 'Steak Asparagus',
                image: '/img/meals/steak-asparagus.png',
                quantity: 9,
                price: 18.99
            }, {
                name: 'Vegetable Ramen',
                image: '/img/meals/vegetable-ramen.png',
                quantity: 7,
                price: 14.99
            }, {
                name: 'Vegetable Medly',
                image: '/img/meals/vegetable-medley.png',
                quantity: 3,
                price: 12.99
            }],
            inventory: [{
                name: 'Lettuce',
                image: '/img/inventory/lettuce.png',
                quantity: 12,
                price: 0.99
            }, {
                name: 'Asparagus',
                image: '/img/inventory/asparagus.png',
                quantity: 35,
                price: 2.99
            }, {
                name: 'Bell Peppers',
                image: '/img/inventory/bell-pepper.png',
                quantity: 16,
                price: 0.99
            }, {
                name: 'Potatoes',
                image: '/img/inventory/potatoe.png',
                quantity: 24,
                price: 3.99
            }, {
                name: 'Eggplant',
                image: '/img/inventory/eggplant.png',
                quantity: 5,
                price: 1.29
            }, {
                name: 'Lemon',
                image: '/img/inventory/lemon.png',
                quantity: 22,
                price: 0.55
            }],
            driver: "Alvin Kay",
            "title": "Van 1011"
        }, {
            "stops": [{
                "arrival": 1523752015,
                "departure": 1523755315,
                "lat": 33.9451700587415,
                "lon": -118.29646483757972
            }, {
                "arrival": 1523756755,
                "departure": 1523759455,
                "lat": 33.946505151321105,
                "lon": -118.2747335697915
            }, {
                "arrival": 1523760355,
                "departure": 1523765755,
                "lat": 33.93384735646531,
                "lon": -118.31839151954912
            }, {
                "arrival": 1523767135,
                "departure": 1523771455,
                "lat": 33.93262581086527,
                "lon": -118.32220148727916
            }, {
                "arrival": 1523772055,
                "departure": 1523774935,
                "lat": 33.94486594714176,
                "lon": -118.32557431164847
            }, {
                "arrival": 1523776015,
                "departure": 1523778475,
                "lat": 33.93662257755033,
                "lon": -118.26195226529285
            }],
            "revenue": 2203,
            mealKits: [{
                name: 'Seared Scallops',
                image: '/img/meals/seared-scallops.png',
                quantity: 9,
                price: 15.99
            }, {
                name: 'Steak Asparagus',
                image: '/img/meals/steak-asparagus.png',
                quantity: 7,
                price: 18.99
            }, {
                name: 'Vegetable Ramen',
                image: '/img/meals/vegetable-ramen.png',
                quantity: 12,
                price: 14.99
            }, {
                name: 'Vegetable Medly',
                image: '/img/meals/vegetable-medley.png',
                quantity: 6,
                price: 12.99
            }],
            inventory: [{
                name: 'Scallops',
                image: '/img/inventory/scallops.png',
                quantity: 4,
                price: 6.49
            }, {
                name: 'Steak',
                image: '/img/inventory/steak.png',
                quantity: 3,
                price: 7.99
            }, {
                name: 'Eggplant',
                image: '/img/inventory/eggplant.png',
                quantity: 7,
                price: 1.29
            }, {
                name: 'Bell Peppers',
                image: '/img/inventory/bell-pepper.png',
                quantity: 8,
                price: 0.99
            }, {
                name: 'Potatoes',
                image: '/img/inventory/potatoe.png',
                quantity: 5,
                price: 3.99
            }, {
                name: 'Lemon',
                image: '/img/inventory/lemon.png',
                quantity: 22,
                price: 0.55
            }],
            driver: "Lisa Felton",
            "title": "Van 1682"
        }, {
            "stops": [{
                "arrival": 1523752015,
                "departure": 1523755315,
                "lat": 33.95970449419932,
                "lon": -118.28490367953175
            }, {
                "arrival": 1523756635,
                "departure": 1523761675,
                "lat": 33.95063905317519,
                "lon": -118.3011089121343
            }, {
                "arrival": 1523762815,
                "departure": 1523765155,
                "lat": 33.95651281951643,
                "lon": -118.25782918330427
            }, {
                "arrival": 1523766415,
                "departure": 1523770135,
                "lat": 33.94992216491264,
                "lon": -118.31941905634942
            }, {
                "arrival": 1523771635,
                "departure": 1523776735,
                "lat": 33.925603715378365,
                "lon": -118.26384940960314
            }, {
                "arrival": 1523777695,
                "departure": 1523780815,
                "lat": 33.962571198251155,
                "lon": -118.33029670528863
            }, {
                "arrival": 1523781895,
                "departure": 1523785375,
                "lat": 33.92160454320932,
                "lon": -118.31319913555139
            }, {
                "arrival": 1523786515,
                "departure": 1523793055,
                "lat": 33.89678922783786,
                "lon": -118.27250603294287
            }, {
                "arrival": 1523793655,
                "departure": 1523797135,
                "lat": 33.89933812023078,
                "lon": -118.30987773355568
            }],
            "revenue": 1916,
            mealKits: [{
                name: 'Seared Scallops',
                image: '/img/meals/seared-scallops.png',
                quantity: 12,
                price: 15.99
            }, {
                name: 'Steak Asparagus',
                image: '/img/meals/steak-asparagus.png',
                quantity: 6,
                price: 18.99
            }, {
                name: 'Vegetable Ramen',
                image: '/img/meals/vegetable-ramen.png',
                quantity: 14,
                price: 14.99
            }, {
                name: 'Vegetable Medly',
                image: '/img/meals/vegetable-medley.png',
                quantity: 24,
                price: 12.99
            }],
            inventory: [{
                name: 'Steak',
                image: '/img/inventory/steak.png',
                quantity: 18,
                price: 7.99
            }, {
                name: 'Lemon',
                image: '/img/inventory/lemon.png',
                quantity: 22,
                price: 0.55
            }, {
                name: 'Asparagus',
                image: '/img/inventory/asparagus.png',
                quantity: 17,
                price: 2.99
            }, {
                name: 'Bell Peppers',
                image: '/img/inventory/bell-pepper.png',
                quantity: 4,
                price: 0.99
            }, {
                name: 'Potatoes',
                image: '/img/inventory/potatoe.png',
                quantity: 24,
                price: 3.99
            }, {
                name: 'Eggplant',
                image: '/img/inventory/eggplant.png',
                quantity: 5,
                price: 1.29
            }],
            driver: "John Davis",
            "title": "Van 2550"
        }]
    }

    res.render(path.resolve('views/pages/index.ejs'), {
        trucks: trucks.trucks
    });
};