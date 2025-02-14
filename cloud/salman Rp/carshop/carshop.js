var carshop = new Vue({
  el: ".container",

  data: {
    // https://cdn.jsdelivr.net/gh/Henry-Alex/cdnrp@main/cloud/inventoryItems/vehicle
    cloud:
      "https://cdn.jsdelivr.net/gh/Henry-Alex/cdnrp@main/cloud/inventoryItems/vehicle",

    Carlist: [],
    Carselect: [],
    MaxSpeed: 0,
    Coins: 0,
  },
  methods: {
    CarClickSelect(item) {
      this.Carselect = item;
      mp.trigger("GetCarInfo", item.name.toLowerCase());
    },
    initCarShopData(data, coins) {
      this.Coins = coins;
      this.Carlist = JSON.parse(data);
      this.Carselect = this.Carlist[0];
      mp.trigger("GetCarInfo", Carselect.name.toLowerCase());
    },
    BuyVehicle() {
      mp.trigger("BuyVehicleDonateNew", this.Carselect.name.toLowerCase());
    },
    StartTestDrive() {
      mp.trigger("testDriveDonateNew", this.Carselect.name.toLowerCase());
    },
    CloseCarShop() {
      mp.trigger("closeAuto");
    },
  },
});
//let s = '[{"name":"bati","bagageSlots":25,"price":100000},{"name":"Frogger","bagageSlots":25,"price":35000},{"name":"Maverick","bagageSlots":25,"price":37500},{"name":"Prototipo","bagageSlots":25,"price":20000},{"name":"Shotaro","bagageSlots":25,"price":15000},{"name":"Supervolito","bagageSlots":25,"price":40000},{"name":"Swift","bagageSlots":25,"price":50000},{"name":"Tezeract","bagageSlots":25,"price":17500},{"name":"Tyrant","bagageSlots":25,"price":12500},{"name":"Volatus","bagageSlots":25,"price":75000},{"name":"bvit","bagageSlots":10,"price":160000},{"name":"lp700r","bagageSlots":20,"price":40000}]'
//carshop.initCarShopData(s, 23);
