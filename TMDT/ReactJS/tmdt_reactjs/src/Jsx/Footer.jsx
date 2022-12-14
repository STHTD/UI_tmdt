import '../Css/Base.css';
import '../Css/Grid.css';
import '../Css/Main.css';
import '../Css/Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    const backToTopBtn = document.querySelector('.js-back-to-top');
    function BackToTop() {
      window.scrollTo(0, 0);
      console.log('click');
    }
    backToTopBtn.addEventListener('click', BackToTop);
  });
  return (
    <footer>
      <div className="grid wide">
        <div className="row">
          <div className="column l-3 logo-spkt">
            <a
              href="https://www.facebook.com/dhspkt.hcmute"
              className="link logo-spkt__link"
              target="_blank"
              rel="noreferrer"
            >
              <div className="logo-spkt__img"></div>
            </a>
          </div>
          <div className="column l-7 info">
            <div className="row teacher-info">
              <a
                href="https://www.facebook.com/luongviminh"
                className="link teacher-name"
                target="_blank"
              >
                Gv: Lương Vĩ Minh
              </a>
            </div>
            <div className="row students-info">
              <a
                href="https://www.facebook.com/thomastheonefour.12"
                target="_blank"
                rel="noreferrer"
                className="column l-4 link student-info student1"
              >
                <div className="student-name student1-name">
                  Nguyễn Minh Cương
                </div>
                <div className="student-id student1-id">19110016</div>
              </a>
              <a
                href="https://www.facebook.com/thang.caoxuan.568"
                target="_blank"
                rel="noreferrer"
                className="column l-4 link student-info student2"
              >
                <div className="student-name student2-name">Cao Xuân Thắng</div>
                <div className="student-id student2-id">19119222</div>
              </a>
              <a
                href="https://www.facebook.com/buep.303"
                target="_blank"
                rel="noreferrer"
                className="column l-4 link student-info student3"
              >
                <div className="student-name student3-name">
                  Nguyễn Hữu Đăng
                </div>
                <div className="student-id student3-id">19110187</div>
              </a>
            </div>
            <div className="row students-info">
              <a
                href="https://www.facebook.com/PerfectVessel/"
                target="_blank"
                rel="noreferrer"
                className="column l-6 link student-info student4"
              >
                <div className="student-name student4-name">
                  Nguyễn Văn Sơn Tùng
                </div>
                <div className="student-id student4-id">19110018</div>
              </a>
              <a
                href="https://www.facebook.com/chienbeo17"
                className="column l-6 link student-info student5"
              >
                <div className="student-name student5-name">
                  Nguyễn Minh Chiến
                </div>
                <div className="student-id student5-id">19110173</div>
              </a>
            </div>
          </div>
          <div className="column l-2 social-network">
            <a
              href="https://rr.noordstar.me/46f10c0d"
              target="_blank"
              rel="noreferrer"
              className="link social-network__link fb__link"
            >
              <FontAwesomeIcon icon={faFacebook} />
              {/* <i className="fa-brands fa-facebook"></i> */}
            </a>
            <a
              href="https://rr.noordstar.me/46f10c0d"
              target="_blank"
              rel="noreferrer"
              className="link social-network__link instagram__link"
            >
              <FontAwesomeIcon icon={faInstagram} />
              {/* <i className="fa-brands fa-instagram"></i> */}
            </a>
            <a
              href="https://rr.noordstar.me/46f10c0d"
              target="_blank"
              rel="noreferrer"
              className="link social-network__link twitter__link"
            >
              <FontAwesomeIcon icon={faTwitter} />
              {/* <i className="fa-brands fa-twitter"></i> */}
            </a>
            <a className="back-to-top link js-back-to-top" rel="noreferrer">
              <FontAwesomeIcon icon={faAngleUp} />
              {/* <i className="fa-solid fa-angle-up"></i> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
