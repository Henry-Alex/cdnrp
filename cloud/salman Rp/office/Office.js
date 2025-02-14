var office = new Vue({
  el: ".main",

  data: {
    Menutype: 1,
    StateOffices: [],
    TaskList: [],
    PlayerTaskList: [],
    SelectedOffice: [],
    OwnOfficeID: -1,
  },
  methods: {
    InitOffice(ownoffice, data) {
      this.OwnOfficeID = ownoffice;
      this.StateOffices = JSON.parse(data);
      if (this.OwnOfficeID != -1) {
        this.SelectedOffice = this.StateOffices.find(
          (x) => x.ID == this.OwnOfficeID
        );
        if (this.SelectedOffice != undefined) {
          this.Menutype = 2;
        }
      } else {
        this.Menutype = 0;
      }
    },
    CanTakeContracts(officeid) {
      if (this.OwnOfficeID == officeid) return true;

      let find = this.PlayerTaskList.find((x) => x.OfficeId == officeid);
      if (find != undefined && officeid == find.OfficeId) {
        return true;
      }

      if (this.PlayerTaskList.length == 0) return true;

      return false;
    },
    ShowStateOffices() {
      // if(this.PlayerTaskList.length != 0)
      //     return;
      this.Menutype = 1;
    },
    GetPlayerTaskStatus(taskid) {
      //console.log(taskid)
      let find = this.PlayerTaskList.find((x) => x.TaskID == taskid);
      if (find == undefined) {
        return -1;
      } else {
        return find.Status;
      }
    },

    ShowOfficeTask(data, platertasklist) {
      this.PlayerTaskList = JSON.parse(platertasklist);
      this.TaskList = JSON.parse(data);
    },
    GetPlayerTaskOffice() {
      if (this.PlayerTaskList.length > 0)
        return this.PlayerTaskList[0].OfficeId;

      return -1;
    },
    OnOfficeSelect(i) {
      if (i.ID == this.OwnOfficeID) {
        this.Menutype = 2;
        return;
      }
      if (!this.CanTakeContracts(i.ID)) {
        //alert("You already have a contract with another office");
        return;
      }

      this.SelectedOffice = i;
      this.Menutype = 2;

      mp.trigger("Client:GetOfficeTasks", this.SelectedOffice.ID);
    },
    Escpress() {
      this.Menutype = 0;
    },
    BuyNewOffice() {
      mp.trigger("BuyNewOffice");
    },
    DaysUntilPayRentDate(unixTimestamp) {
      const payRentDate = new Date(unixTimestamp * 1000);
      const currentDate = new Date();
      const differenceInMilliseconds = payRentDate - currentDate;
      const differenceInDays = Math.ceil(
        differenceInMilliseconds / (1000 * 60 * 60 * 24)
      );
      return differenceInDays;
    },
    ChangeOfficename(officeid) {
      if (this.OwnOfficeID != officeid) return;
      mp.trigger("Client:ChangeOfficeName");
    },
    PayOfficeRent(officeid) {
      if (this.OwnOfficeID != officeid) return;
      mp.trigger("Client:PayOfficeRent");
    },
    CloseOffice() {
      mp.trigger("destroyBrowser");
    },
  },
});

// let s = `[{"ID":3,"Owner":1,"Name":"Shourya Singh's Office","PayRentDate":1736779824,"Profit":0},{"ID":2,"Owner":1,"Name":"Shourya Singh's Office","PayRentDate":1736779824,"Profit":0}]`
// office.InitOffice(-1, s)
// let task = '[{"Id":12,"Description":"Repair a vehicle using a wrench"},{"Id":2,"Description":"Drive 5 miles with a passenger as a taxi driver"},{"Id":126,"Description":"Pass a marker to the driver as a passenger"},{"Id":64,"Description":"Drive 60 markers while working as a bus driver"},{"Id":18,"Description":"Get a tattoo on any part of your body"},{"Id":95,"Description":"Ride 10 miles as a passenger in a taxi"}]';

// let list = '[{"TaskID":12,"OfficeId":2,"Status":0},{"TaskID":2,"OfficeId":2,"Status":0},{"TaskID":126,"OfficeId":2,"Status":0},{"TaskID":64,"OfficeId":2,"Status":0},{"TaskID":18,"OfficeId":2,"Status":0},{"TaskID":95,"OfficeId":2,"Status":0}]'
// office.ShowOfficeTask(task, list);
