import { app } from "./web_modules/hyperapp.js";
import Chart from "./web_modules/chart.js/dist/Chart.js";
import dropWhile from "./web_modules/lodash.dropwhile.js";
import zip from "./web_modules/lodash.zip.js";
import unzip from "./web_modules/lodash.unzip.js";
import prop from "./web_modules/lodash.property.js";
import { request } from "./web_modules/@hyperapp/http.js";
import { HistoryPop, HistoryPush } from "./web_modules/hyperapp-fx.js";
import qs from "./web_modules/qs.js";
import htm from "./web_modules/htm.js";
import { h } from "./web_modules/hyperapp.js";
import {
  ReadFromStorage,
  WriteToStorage,
  RemoveFromStorage
} from "./web_modules/hyperapp-fx.js";
import mapValues from "./web_modules/lodash.mapvalues.js";
import stc from "./web_modules/string-to-color.js";
import { preventDefault } from "./web_modules/@hyperapp/events.js";
import { targetValue } from "./web_modules/@hyperapp/events.js";
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
import orderBy from "./web_modules/lodash.orderby.js";
import pick from "./web_modules/lodash.pick.js";
import cc from "./web_modules/classcat.js";
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
