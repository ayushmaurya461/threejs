var _ = require('lodash');


var obj = {
    lvl1: {
        val:1,
        lvl2:{
            val:2,
            lvl3:{
                val:3,
                lvl4:{
                    val:4,
                    lvl5:{
                        val:5,
                        lvl6:{
                            val:6
                        }
                    }
                }
            }
        }
    }
}

const copiedObj = _.cloneDeep(obj);

obj.lvl1.lvl2.lvl3.lvl4.lvl5.lvl6 ={value:10};

console.log(JSON.stringify(copiedObj))