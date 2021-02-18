import "@vaadin/vaadin-charts/src/vaadin-chart-series";
import { customElement, html } from "lit-element";
import { View } from "../view";
import "@vaadin/vaadin-charts";
import { dashboardViewStore } from "./dashboard-view-store";
import { appState } from "Frontend/store/appstate";

@customElement("dashboard-view")
export class DashboardView extends View {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add("v-flex", "v-flex-column", "v-items-center", "v-pt-xl");
  }

  render() {
    return html`
      <div class="v-font-size-xl v-mb-xl">
        ${dashboardViewStore.contactCount} contacts
      </div>

      ${this.getCompanyStats()}
    `;
  }

  getCompanyStats() {
    if (dashboardViewStore.companyStats.length === 0) {
      if (appState.offline) {
        return html`<p>Connect to the internet to view stats</p>`;
      } else {
        return html`<p>Loading stats...</p>`;
      }
    } else {
      return html`
        <vaadin-chart type="pie">
          <vaadin-chart-series
            .values=${dashboardViewStore.companyStats}
          ></vaadin-chart-series>
        </vaadin-chart>
      `;
    }
  }
}
