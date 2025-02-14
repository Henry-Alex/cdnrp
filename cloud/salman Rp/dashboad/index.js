
var DASHB = new Vue({
    el: '.DashMain',
    
    
    data: {
       
    },
    methods : {
       OpenType(otype)
       {
            mp.trigger("CloseDashBoardUI", otype);
       }
        
    },
});
