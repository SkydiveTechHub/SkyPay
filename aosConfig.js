// aosConfig.js
import 'aos/dist/aos.css'; // Import AOS CSS

const initializeAOS = () => {
  import('aos').then((AOS) => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-out',
      once: true,
    });
  });
};

export default initializeAOS;
