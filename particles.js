var SPEED_MAX = 50;
var ACC_MAX = 3;
var ACC_MIN = 1;
var ACC_SCALE = 0.5;
var G_RADIUS = 300;


class Coords {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
};


function rrandom(min, max) {

    return Math.random() * (max - min) + min;

};


function distance(from, to) {

    let x = (to.x - from.x);
    let y = (to.y - from.y);
    let z = (to.z - from.z);
    return Math.sqrt((x * x + y * y + z * z));

}

function objetiveVector(from, to) {
    let x = (to.x - from.x);
    let y = (to.y - from.y);
    let z = (to.z - from.z);
    let m = Math.sqrt((x * x + y * y + z * z));
    return new Coords(x / m, y / m, z / m);
}

function module(vector) {
    let x = vector.x;
    let y = vector.y;
    let z = vector.z;
    return Math.sqrt((x * x + y * y + z * z));
}



class Particle {
    constructor(space) {

        let x = rrandom(0, space.x);
        let y = rrandom(0, space.y);
        let z = rrandom(0, space.z);
        this.pos = new Coords(x, y, z);

        this.v = new Coords(0, 0, 0);

        let ax = rrandom(-ACC_MIN, ACC_MIN);
        let ay = rrandom(-ACC_MIN, ACC_MIN);
        let az = rrandom(-ACC_MIN, ACC_MIN);

        this.a = new Coords(ax, ay, az);


    };
    checkSpace(space) {
        if (this.pos.x < 0 || this.pos.x > space.x)
            this.v.x = -this.v.x;
        if (this.pos.y < 0 || this.pos.y > space.y)
            this.v.y = -this.v.y;
        if (this.pos.z < 0 || this.pos.z > space.z)
            this.v.z = -this.v.z;
    };
    reasoning(objetive, space) {

        let x = this.pos.x + 10 * (this.v.x + this.a.x);

        let y = this.pos.y + 10 * (this.v.y + this.a.y);
        let z = this.pos.z + 10 * (this.v.z + this.a.z);
        let dp = new Coords(x, y, z);

        let acc = objetiveVector(dp, objetive);
        let d = this.distance(objetive);
        this.a.x = acc.x * ACC_SCALE;
        this.a.y = acc.y * ACC_SCALE;
        //this.a.z = acc.z * ACC_SCALE;

    }
    update(objetive, space) {

        if (objetive != 0) {
            this.reasoning(objetive, space);
        }

        this.v.x += this.a.x;
        this.v.y += this.a.y;
        this.v.z += this.a.z;

        this.checkSpace(space);

        this.pos.x += this.v.x;
        this.pos.y += this.v.y;
        this.pos.z += this.v.z;


    };
    distance(to) {

        let x = (to.x - this.pos.x);
        let y = (to.y - this.pos.y);
        let z = (to.z - this.pos.z);
        return Math.sqrt((x * x + y * y + z * z));

    };
    print() {
        console.log(distance(this.pos, ))
    };

}
class Swarm {
    constructor(size, space, objetive) {
        this.s = [];
        this.size = size;
        this.space = space;

        for (var i = 0; i < size; i++) {
            this.s.push(new Particle(space));
        }
    };
  
    update(objetive) {
        for (var i = 0; i < this.size; i++) {
             this.s[i].update(objetive, space);
            /*
            if (G_RADIUS < this.s[i].distance(objetive))
                this.s[i].update(0, space);
            else
                this.s[i].update(objetive, space);
            */
        }
    };
    print(value) {
        var str = ""
        for (var i = 0; i < this.size; i++) {
            if (value == 'distance')
                str += this.s[i].distance(objetive).toFixed(2) + " | ";
            if (value == 'accx')
                str += this.s[i].a.x.toFixed(2) + " | ";
            if (value == 'accmod')
                str += module(this.s[i].a).toFixed(2) + " | ";
            if (value == 'all')
                str += this.s[i].distance(objetive).toFixed(2) + " | " + this.s[i].pos.x;
        }
    };

}





/*
var space = new Coords(300, 1, 1);
var objetive = new Coords(200, 1, 1);
var particle = new Particle(space);
var swarm = new Swarm(1, space, objetive);
*/
