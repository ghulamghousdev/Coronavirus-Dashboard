import { html } from "./html.js";
import { Container } from "./container.js";
import { initialState } from "./state.js";
import { fetchReport } from "./fetch.js";

const ResetState = _ => [initialState, [fetchReport]];

export const header = html`
  <${Container} class="bg-primary">
      <header>
        <div class="navbar">
          <section class="navbar-section">
            <span class="navbar-brand text-bold text-light mt-2"
              >Corona Virus DashBoard</span
            >
          </section>
          <section class="navbar-section">
            <a
              href="https://github.com/ghulamghousdev/coronavirus-dashboard"
              class="btn btn-link text-light"
              target="_blank"
              >GitHub</a
            >
          </section>
        </div>
        <div class="hero hero-sm">
          <div onclick=${ResetState} class="c-hand hero-body columns">
            <div class="column col-auto">
              <figure
                class="avatar avatar-xl badge"
                data-badge="19"
                data-initial="YZ"
              >
                <img
                  src="https://picturepan2.github.io/spectre/img/avatar-1.png"
                />
              </figure>
            </div>
            <div class="column column-center">
              <kbd class="text-large"
                >Coronavirus trends comparison by country</kbd
              >
            </div>
          </div>
        </div>
      </header>
  </${Container}>
`;
