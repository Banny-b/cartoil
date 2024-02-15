$(document).ready(function() {
  wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animate__animated',
      offset: 0,
      mobile: true,
      live: true
  });
  wow.init();
});

// $(function(){
//   wow = new WOW(
//     {
//       boxClass: 'wow',                   // default
//       animateClass: 'animate__animated', // default
//       offset: 0,                         // default
//       mobile: true,                      // default
//       live: true                         // default
//     }
//   )
//   wow.init();
// });