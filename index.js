import { app } from "./web_modules/hyperapp.js";
import { worldMap } from "./src/countriesMap.js";
import { chartView, ChartListen } from "./src/chart.js";
import { html } from "./src/html.js";
import { Container } from "./src/container.js";
import { header } from "./src/header.js";
import { tab } from "./src/tab.js";
import { table } from "./src/table.js";
import { select } from "./src/select.js";
import { countryChips } from "./src/country.js";
import { fetchReport } from "./src/fetch.js";
import { initialState } from "./src/state.js";
import {
  LoadPreferences,
  SavePreferencesListen,
  CleanPreferencesOnErrorListen
} from "./src/preferences.js";
import { HistoryListen, ReadStateFromUrl } from "./src/history.js";
// import logger from "./web_modules/hyperapp-v2-basiclogger.js";

const main = state => html`
  <${Container}>
      ${countryChips(state)} ${chartView(state)} ${select(state)} ${worldMap(
  state
)} 
      ${countryChips(state)}
  </Container>
`;

const view = state =>
  html`
    <div>
      ${header} ${tab(state)} ${main(state)} ${table(state)}
    </div>
  `;

app({
  init: [
    initialState,
    CleanPreferencesOnErrorListen,
    LoadPreferences,
    fetchReport,
    ChartListen,
    ReadStateFromUrl,
    SavePreferencesListen,
    HistoryListen
  ],
  view,
  // middleware: logger,
  node: document.getElementById("app")
});
