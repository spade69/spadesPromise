//testing only supported at nodejs environment
var assert=require('assert');
var spades=require('../promisify');
//test a Array.prototype.indexOf  added in ES5 IE9+
describe('Array',function(){
    describe('#indexOf()',function(){
        it('should return -1 when the value is not present',function(){
            assert.equal(-1,[1,2,3].indexOf(4));
        });
    });
});

//test Array.prototype.map
describe('ArrMap',function(){
    describe('#Arrmap()',function(){
        //adding a callback(named done) to it() , Mocha will wait for this function to be  called
        //to complete the test.
        it('should map without error',function(){
            var arr=[1,2,3,4];
            assert.deepEqual([2,4,6,8],arr.map(function(index){
                return index*2;
            }))
        });
    });
});


//test Promisify map
// beforeEach(function(){
//     return spades.map()
//         .then()
// })

/*describe('promise map',function(){
    describe('#promiseMap',function(){
        it('async request should retrun a object',function(done){
            let arr=[1,2,3,4];
            return spades.map(arr,done)
                .then(function(){
                    ///assert.ok()
                }).catch(function(reason){
                    console.log(reason);
                })
        })
    })
})*/

//testing coverage
describe('parseAsync',function(){
    it('parseAsync should ok',function(done){
        spades.parseAsync('{"name":"JacksonTian"}',function(err,data){
            assert.ifError(err);//if 'err' is truthy then it throws an error!
            assert.equal(data.name,'JacksonTian');
            done();
        });
    });
});
