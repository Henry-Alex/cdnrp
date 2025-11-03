window.auth = new Vue({
  el: ".Main",

  data: {
    started: false,
    menutype: 0,
    loginuser: "",
    loginpassword: "",
    alart: "",
    altimer: undefined,
    reguser: "",
    email: "",
    regpassword: "",
    regconfirmpassword: "",
    promocode: "",
  },

  mounted() {
    console.log("Vue mounted ✅");

    // Listen for key presses
    window.addEventListener("keydown", (e) => {
      console.log("Key detected:", e.key);

      // 1️⃣ Start auth screen when user presses Enter first time
      if (e.key === "Enter" && !this.started) {
        console.log("Enter pressed — starting auth");
        this.started = true;
        return;
      }

      // 2️⃣ If started and in login mode
      if (e.key === "Enter" && this.started && this.menutype === 0) {
        console.log("Submitting login form...");
        this.SendLoginInfo();
        return;
      }

      // 3️⃣ If started and in register mode
      if (e.key === "Enter" && this.started && this.menutype === 1) {
        console.log("Submitting register form...");
        this.SendRegisterInfo();
        return;
      }
    });
  },

  methods: {
    SendLoginInfo() {
      if (this.loginuser.length < 1 || this.loginpassword.length < 1) {
        this.sendalart("Invalid Username or password");
        return;
      }
      mp.trigger("client:OnSignInv2", this.loginuser, this.loginpassword);
    },

    SendRegisterInfo() {
      if (this.reguser.length < 1) {
        this.sendalart("Please type a valid Username");
        return;
      }
      if (this.regpassword.length < 1) {
        this.sendalart("Password should not be empty");
        return;
      }
      if (this.regconfirmpassword !== this.regpassword) {
        this.sendalart("Password mismatch");
        return;
      }
      mp.trigger(
        "client:OnSignUpv2",
        this.reguser,
        this.email,
        this.promocode,
        this.regpassword,
        this.regconfirmpassword
      );
    },

    sendalart(msg) {
      this.alart = msg;
      clearTimeout(this.altimer);
      this.altimer = setTimeout(() => {
        this.alart = "";
      }, 5000);
    },
  },
});

// window.auth = new Vue({
//   el: ".Main",

//   data: {
//     started: false,
//     menutype: 0,
//     loginuser: "",
//     loginpassword: "",
//     alart: "",
//     altimer: undefined,
//     reguser: "",
//     email: "",
//     regpassword: "",
//     regconfirmpassword: "",
//     promocode: "",
//   },

//   mounted() {
//     console.log("Vue mounted ✅");

//     window.addEventListener("keydown", (e) => {
//       console.log("Key detected inside Vue:", e.key);
//       if (e.key === "Enter" && !this.started) {
//         console.log("Enter pressed — switching started = true");
//         this.started = true;
//       }
//     });
//   },

//   methods: {
//     SendLoginInfo() {
//       if (this.loginuser.length < 1 || this.loginpassword.length < 1) {
//         this.sendalart("Invalid Username or password");
//         return;
//       }
//       mp.trigger("client:OnSignInv2", this.loginuser, this.loginpassword);
//     },

//     SendRegisterInfo() {
//       if (this.reguser.length < 1) {
//         this.sendalart("please type a valid Username");
//         return;
//       }
//       if (this.regpassword.length < 1) {
//         this.sendalart("password should not be empty");
//         return;
//       }
//       if (this.regconfirmpassword !== this.regpassword) {
//         this.sendalart("password mismatch");
//         return;
//       }
//       mp.trigger(
//         "client:OnSignUpv2",
//         this.reguser,
//         this.email,
//         this.promocode,
//         this.regpassword,
//         this.regconfirmpassword
//       );
//     },

//     sendalart(msg) {
//       this.alart = msg;
//       clearTimeout(this.altimer);
//       this.altimer = setTimeout(() => {
//         this.alart = "";
//       }, 5000);
//     },
//   },
// });
