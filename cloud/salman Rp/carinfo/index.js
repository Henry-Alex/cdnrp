var ChipTuner = new Vue({
  el: ".mainc",

  data: {
    Money: 10000000,
    VehicleInfo: {
      Name: "Audi r8",
      Plate: "23rtr45",
      Owner: "Pappu",
      MaxTank: 20,
      StateValue: 5000000,
      Engine: 650.989,
    },
    TuneTypes: [
      { ID: 11, Name: "Engine", Level: 0 },
      { ID: 12, Name: "Brakes", Level: 1 },
      { ID: 13, Name: "Suspension", Level: 1 },
      { ID: 15, Name: "Transmission", Level: 1 },
    ],
    askmenu: false,
    ask: "Engine Upgrade",
    Speed: 5,
    ItemToUpgrade: [],
    action: 1,
    tunesteps: [4, 3, 4, 3, 0],
    IsOwner: true,

    NoMoney: false,
  },

  methods: {
    GetEngineHealth() {
      if (this.VehicleInfo.Engine < 1) {
        return 0;
      }
      return (this.VehicleInfo.Engine / 1000) * 100;
    },
    GetLength(id) {
      if (id == 11 || id == 13) return 3;
      if (id == 12 || id == 15) return 2;
      else return 0;
    },
    formatMoney(amount) {
      return "$" + amount.toLocaleString("en-US");
    },

    Setup(vehinfo, data) {
      this.VehicleInfo = JSON.parse(vehinfo);
      let d = JSON.parse(data);

      this.TuneTypes[0].Level = d.Engine;

      this.TuneTypes[1].Level = d.Brakes;

      this.TuneTypes[2].Level = d.Suspension;

      this.TuneTypes[3].Level = d.Transmission;
    },

    levelText(level) {
      let s = "Stock";
      switch (level) {
        case -1:
          s = "Stock";
          break;
        case 0:
          s = "Standard";
          break;
        case 1:
          s = "Medium";
          break;
        case 2:
          s = "Advanced";
          break;
        case 3:
          s = "Pro";
          break;
      }
      return s;
    },
    levelTextBgColor(level) {
      let s = "white";
      switch (level) {
        case -1:
          s = "white";
          break;
        case 0:
          s = "yellow";
          break;
        case 1:
          s = "orange";
          break;
        case 2:
          s = "blue";
          break;
        case 3:
          s = "red";
          break;
      }
      return s;
    },
    Close() {
      mp.events.call("destroyBrowser");
    },
  },
});

//let s = '{"Engine":0,"Brakes":1,"Suspension":1,"Transmission":2}'
//  ChipTuner.Setup(i, s);
