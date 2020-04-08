import { update } from "./update.js";
import { html } from "./html.js";
import {
  defaultByDate,
  defaultFromPatient,
  LabelStrategies,
  ValueStrategies
} from "./state.js";
import { targetValue } from "../web_modules/@hyperapp/events.js";

export const RemoveFromSelector = state =>
  update({
    ...state,
    labelStrategy: [state.labelStrategy[0], ""]
  });

export const ChangeLabelStrategy = by => state =>
  update({ ...state, labelStrategy: by });

export const SetFromPatient = (state, patient) => {
  if (!Array.isArray(state.labelStrategy[0])) {
    return state;
  }
  const newState = {
    ...state
  };
  const within = (min, max) => n =>
    Math.min(max, Math.max(min, Number(patient)));

  newState.labelStrategy[0][1] = within(0, 99999)(Number(patient));
  return update(newState);
};

const staticChip = (label, action) => () => html`
  <span class="chip c-hand" onclick=${action}>
    ${label}
    <span class="btn btn-clear" href="#" role="button"></span>
  </span>
`;

const fromChip = value =>
  value
    ? html`
        <span class="chip c-hand" onclick=${RemoveFromSelector}>
          From Day ${value}
          <span
            class="btn btn-clear"
            href="#"
            aria-label="Remove Date"
            role="button"
          ></span>
        </span>
      `
    : "";

const fromPatient = n =>
  html`
    ${staticChip("From Patient", ChangeLabelStrategy(defaultByDate))()}
    ${patientNumber(n)}
  `;

const patientNumber = n =>
  html`
    <span class="chip">
      <input
        class="chip-input"
        onchange=${[SetFromPatient, targetValue]}
        type="number"
        min="0"
        max="99999"
        value=${n}
      />
    </span>
  `;

const byDate = staticChip("By Date", ChangeLabelStrategy(defaultFromPatient));

export const labelStrategyChip = ({ labelStrategy: [name, from] }) => {
  const strategy = name === LabelStrategies.BY_DATE ? byDate : fromPatient;
  return html`
    <span>
      ${strategy(name[1])} ${fromChip(from)}
    </span>
  `;
};

export const ChangeValueStrategy = valueStrategy => state =>
  update({ ...state, valueStrategy });

const total = staticChip(
  "Total",
  ChangeValueStrategy(ValueStrategies.INCREASE)
);
const increase = staticChip(
  "Increase",
  ChangeValueStrategy(ValueStrategies.TOTAL)
);

export const valueStrategyChip = ({ valueStrategy }) => {
  const strategy =
    valueStrategy === ValueStrategies.INCREASE ? increase : total;
  return html`
    <span>
      ${strategy()}
    </span>
  `;
};
