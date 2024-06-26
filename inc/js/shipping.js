"use strict";
let agenciesDataSource = [];

const init = async () => {
  try {
    const formDetailsInvoice = document.querySelector("#formDetailsInvoice");
    const shippingRateConsultBtn = document.querySelector(
      "#shippingRateConsult"
    );
    const agencyOriginSelect = document.querySelector("#agencyOriginId");
    const agencyDestinationSelect = document.querySelector(
      "#agencyDestinationId"
    );

    if (
      !formDetailsInvoice ||
      !shippingRateConsultBtn ||
      !agencyOriginSelect ||
      !agencyDestinationSelect
    )
      return;

    const responseAuthentication = await authentication();
    if (responseAuthentication.statusCode !== 1)
      throw new Error(`error: ${responseAuthentication.message}`);

    if (responseAuthentication && responseAuthentication?.data) {
      const { token } = responseAuthentication.data;
      agenciesDataSource = await getAgencies(token);
      setAgencies(
        agenciesDataSource,
        agencyOriginSelect,
        agencyDestinationSelect
      );
      setEvents(
        {
          formDetailsInvoice,
          shippingRateConsultBtn,
          agencyOriginSelect,
          agencyDestinationSelect,
        },
        token
      );
    }
  } catch (error) {
    console.error({ error });
  }
};

const shippingDetailsSubmit = async (token, form) => {
  let raw = {};
  var data = new FormData(form);
  for (var [key, value] of data) {
    raw = { ...raw, [key]: value };
  }

  const detailData = await callShippingDetailsEndpoint(token, raw);
  PopulateDetailsInvoice(detailData?.data);
};

const shippingRateSubmit = async (token, data) => {
  const rate = await callShippingRateEndpoint(token, data);
  rate && populateRateContainer(rate);
};

const callShippingDetailsEndpoint = async (token, raw) => {
  try {
    const detailsData = await customFetch(
      "clientsebolweb/V1/Shipping/GetShippingDetailsByInvoice",
      token,
      raw
    );
    return detailsData;
  } catch (error) {
    console.error(`callShippingDetailsEndpoint-error: ${error}`);
  }
};

const PopulateDetailsInvoice = (detailData = null) => {
  const detailsInvoiceContainer = document.querySelector(
    "#detailsInvoiceContainer"
  );
  let contentHTML = `<div class="noResultsContainer"><span>No se encontraron resultados.</span></div>`;

  if (detailData) {
    const {
      agencyDestinationName,
      agencyOriginName,
      declaredValue,
      invoiceNumber,
      isPaymentAgainstShipping,
      itemCount,
      itemDescription,
      itemHeight,
      itemLength,
      itemType,
      itemWeightKg,
      itemWidth,
      recipientClientDocumentNumber,
      recipientClientLocationAddress,
      recipientClientName,
      recipientClientPhoneNumber,
      senderClientDocumentNumber,
      senderClientLocationAddress,
      senderClientName,
      senderClientPhoneNumber,
      shippingStartDate,
      shippingState,
      totalPayment,
      vehicleId,
      vehiclePlate,
    } = detailData;

    const state = getShippingState(shippingState);

    contentHTML = `
        <div class="detailsContainer">
            <div class="guideInformation">
                <div class="guideTitle"><h4>Información de la guía</h4></div>
                <div class="detailsCard">
                <div class="titleCard"><span class="cardName">Remitente</span></div>
                <div class="contentCard">
                    <ul>
                    <li>
                        <span>Origen</span><span class="content">${agencyOriginName}</span>
                    </li>
                    <li>
                        <span>Nombre</span><span class="content">${senderClientName}</span>
                    </li>
                    <li>
                        <span>Dirección</span
                        ><span class="content">${senderClientLocationAddress}</span>
                    </li>
                    <li>
                        <span>Documento</span
                        ><span class="content">${senderClientDocumentNumber}</span>
                    </li>
                    <li>
                        <span>Teléfono</span
                        ><span class="content">${senderClientPhoneNumber}</span>
                    </li>
                    </ul>
                </div>
                </div>
                <div class="detailsCard">
                <div class="titleCard"><span class="cardName">Destinatario</span></div>
                <div class="contentCard">
                    <ul>
                    <li>
                        <span>Origen</span
                        ><span class="content">${agencyDestinationName}</span>
                    </li>
                    <li>
                        <span>Nombre</span
                        ><span class="content">${recipientClientName}</span>
                    </li>
                    <li>
                        <span>Dirección</span
                        ><span class="content">${recipientClientLocationAddress}</span>
                    </li>
                    <li>
                        <span>Documento</span
                        ><span class="content">${recipientClientDocumentNumber}</span>
                    </li>
                    <li>
                        <span>Teléfono</span
                        ><span class="content">${recipientClientPhoneNumber}</span>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div class="guideDetails">
                <div class="guideTitle"><h4>Detalle de la guía</h4></div>
                <div class="shippingStatusContainer">
                    <div class="shippingTitle">
                        <span>Estado actual</span>
                        <span class="status ${
                          state === "entregada" && "summary-text--done"
                        }">${state}</span>
                    </div>
                    <div class="shippingLine">
                        <ul class="base-timeline ${
                          state === "entregada" && "base-timeline--done"
                        }">
                            <li class="base-timeline__item ${
                              state === "admitida" && "item--active"
                            }">
                                <span class="base-timeline__summary-text                             ${
                                  state === "entregada" && "summary-text--done"
                                }">Admitida</span>
                            </li>
                            <li class="base-timeline__item ${
                              state === "despachada" && "item--active"
                            }">
                                <span class="base-timeline__summary-text                             ${
                                  state === "entregada" && "summary-text--done"
                                }">Despachada</span>
                            </li>
                            <li class="base-timeline__item ${
                              state === "recibida" && "item--active"
                            }">
                                <span class="base-timeline__summary-text                             ${
                                  state === "entregada" && "summary-text--done"
                                }">Recibida</span>
                            </li>
                            <li class="base-timeline__item ${
                              state === "entregada" && "item--active-done"
                            }">
                                <span class="base-timeline__summary-text                             ${
                                  state === "entregada" && "summary-text--done"
                                }">Entregada</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detailsCard">
                    <div class="titleCard"><span class="cardName">Radicación</span></div>
                    <div class="contentCard">
                        <ul>
                        <li>
                            <span>Estado</span><span class="content">${state}</span>
                        </li>
                        <li>
                            <span>Unidades</span><span class="content">${itemCount}</span>
                        </li>
                        <li><span>Peso</span><span class="content">${itemWeightKg}</span></li>
                        <li>
                            <span>Texto guía</span><span class="content">${itemType}</span>
                        </li>
                        </ul>
                    </div>
                </div>
                <div class="detailsCard">
                    <div class="titleCard"><span class="cardName">Entrega</span></div>
                    <div class="contentCard">
                        <ul>
                        <li>
                            <span>Fecha</span><span class="content">${shippingStartDate}</span>
                        </li>
                        <li>
                            <span>Observaciones</span
                            ><span class="content">${itemDescription}</span>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="conventionsContainer">
            <h4>Convenciones</h4>
            <div class="conventionItem">
                <h4>ADMITIDA</h4>
                <span>Es cuando el remitente coloca un envío y este no ha salido de la agencia de origen.</span>
            </div>
            <div class="conventionItem">
                <h4>DESPACHADA</h4>
                <span>Es cuando el envío sale de la agencia y es transportada en un bus con una relación de envíos.</span>
            </div>
            <div class="conventionItem">
                <h4>RECIBIDA</h4>
                <span>Es cuando el envío llega a la agencia de destino y un funcionario de la agencia le da recibido en en sistema.</span>
            </div>
            <div class="conventionItem">
                <h4>ENTREGADA</h4>
                <span>Es cuando el destinatario recoge su mercancía y firma constancia de recibido con nombre legible, número de cédula, fecha y hora de entrega. Una vez entregada la guía del destinatario se le debe dar entregado en el sistema de inmediato.</span>
            </div>
        </div>`;
  }

  detailsInvoiceContainer.innerHTML = contentHTML;
};
const callShippingRateEndpoint = async (token, data) => {
  try {
    const rateData = await customFetch(
      "clientsebolweb/V1/Shipping/GetShippingRateByAgencies",
      token,
      data
    );
    return rateData.data;
  } catch (error) {
    console.error(`callShippingRateEndpoint-error: ${error}`);
  }
};

const getShippingState = (shippingState) => {
  const stateArray = ["admitida", "despachada", "recibida", "entregada"];
  const newState = stateArray.find((state) => {
    const arr = shippingState.toLowerCase().match(state);
    if (arr && arr?.length > 0) {
      return arr[0];
    }
  });

  return newState;
};

const populateSelectAgency = (
  agenciesData = [],
  agencyElement = null,
  isOrigin = true
) => {
  if (!agenciesData || agenciesData.length === 0 || agenciesData === null)
    return;

  const allOptions = document.querySelectorAll(`#${agencyElement.id} option`);
  allOptions.forEach((o) => o.remove());

  const defaultOption = document.createElement("option");
  defaultOption.text = `Selecciona una ciudad de ${
    isOrigin ? "origen" : "destino"
  }`;
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;

  agencyElement.add(defaultOption, agencyElement.length);
  agenciesData?.forEach((agency) => {
    const option = document.createElement("option");
    option.text = agency.agencyName;
    option.value = agency.agencyId;
    agencyElement.add(option, agencyElement.length);
  });
};

const populateRateContainer = ({ itemRate }) => {
  const quoteCostsContainer = document.querySelector("#quoteCosts");
  quoteCostsContainer.innerHTML = "";
  const rateContainer = document.createElement("div");
  rateContainer.classList.add("form-control-shipping");
  const span = document.createElement("span");
  span.textContent = `El valor aproximado de tu envío es: $ ${formattedCOP(
    itemRate
  )}`;
  rateContainer.append(span);
  quoteCostsContainer.append(rateContainer);
};

const setAgencies = (agenciesDataSource, agencyOrigin, agencyDestination) => {
  populateSelectAgency(agenciesDataSource, agencyOrigin);
  populateSelectAgency([], agencyDestination, false);
};

const setEvents = async (elements, token) => {
  const {
    formDetailsInvoice,
    shippingRateConsultBtn,
    agencyOriginSelect,
    agencyDestinationSelect,
  } = elements;

  shippingRateConsultBtn.addEventListener("click", () => {
    const result = validateFields({
      itemWidth: document.querySelector("#itemWidth"),
      itemLength: document.querySelector("#itemLength"),
      itemHeight: document.querySelector("#itemHeight"),
      itemWeightKg: document.querySelector("#itemWeightKg"),
      itemDeclaredValue: document.querySelector("#itemDeclaredValue"),
      agencyOrigin: document.querySelector("#agencyOriginId"),
      agencyDestination: document.querySelector("#agencyDestinationId"),
    });
    if (result.hasEmptyValue) return;
    shippingRateSubmit(token, result.fieldValues);
  });
  formDetailsInvoice.addEventListener("submit", (e) => {
    e.preventDefault();
    shippingDetailsSubmit(token, e.target);
  });

  agencyOriginSelect.addEventListener("change", (e) => {
    const value = e?.target?.value;
    const currentOriginAgency = agenciesDataSource.find(
      (agency) => parseInt(agency.agencyId) === parseInt(value)
    );
    const agenciesDestinationDataSource =
      currentOriginAgency?.destinationAgencies ?? [];
    populateSelectAgency(
      agenciesDestinationDataSource,
      agencyDestinationSelect,
      false
    );
  });
};

const validateFields = (fieldsToValidate = {}) => {
  let fieldValidate = {
    hasEmptyValue: false,
    fieldValues: {},
  };
  const fieldsArr = Object.values(fieldsToValidate);
  fieldsArr?.forEach((field) => {
    const value = field.value;
    !value &&
      !fieldValidate.hasEmptyValue &&
      (fieldValidate.hasEmptyValue = true);
    fieldValidate.fieldValues[field.name] = parseInt(value);
  });
  return fieldValidate;
};

const formattedCOP = (rate) =>
  rate.toLocaleString("es-co", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

window.addEventListener("load", () => init());
