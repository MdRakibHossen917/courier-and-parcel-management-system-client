import React from "react";
import ExpressLogo from "../ExpressLogo/ExpressLogo";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <aside>
        <ExpressLogo />
        <p>
          Express Courier Service Ltd.
          <br />
          Providing reliable delivery service since 1992.
        </p>
      </aside>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://www.facebook.com/md.rakib.hossen.41751"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
            </svg>
          </a>

          <a
            href="https://github.com/MdRakibHossen917"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 .5C5.373.5 0 5.873 0 12.5c0 5.292 3.438 9.776 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.386-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.204.085 1.838 1.236 1.838 1.236 1.07 1.832 2.809 1.303 3.495.996.108-.775.418-1.304.761-1.604-2.665-.304-5.467-1.333-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.521 11.521 0 0 1 3.003-.403c1.018.005 2.044.137 3.003.403 2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.429.369.823 1.096.823 2.211v3.281c0 .319.192.694.801.576C20.565 22.272 24 17.792 24 12.5 24 5.873 18.627.5 12 .5z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/rakibhossen917/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.2h.05c.5-.95 1.75-2 3.6-2 3.85 0 4.55 2.55 4.55 5.85V24h-4V14.25c0-2.3-.05-5.25-3.2-5.25-3.2 0-3.7 2.5-3.7 5.1V24h-4V8z" />
            </svg>
          </a>

          <a
            href="https://my-portfolio-dd98e.web.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.238 3.366 9.675 8.062 11.328.59.108.81-.256.81-.57 0-.282-.011-1.028-.017-2.017-3.278.713-3.969-1.58-3.969-1.58-.536-1.362-1.31-1.725-1.31-1.725-1.07-.732.082-.717.082-.717 1.183.083 1.806 1.216 1.806 1.216 1.053 1.804 2.761 1.283 3.433.981.107-.763.412-1.284.75-1.579-2.617-.297-5.371-1.308-5.371-5.823 0-1.286.461-2.337 1.216-3.161-.122-.298-.527-1.502.115-3.132 0 0 .99-.317 3.245 1.211A11.33 11.33 0 0 1 12 6.844c1.003.005 2.014.136 2.957.398 2.25-1.528 3.238-1.211 3.238-1.211.645 1.63.24 2.834.117 3.132.758.824 1.215 1.875 1.215 3.161 0 4.527-2.759 5.522-5.39 5.813.425.37.803 1.101.803 2.219 0 1.604-.014 2.898-.014 3.293 0 .317.216.684.819.568C20.63 21.673 24 17.237 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
