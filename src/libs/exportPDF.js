import { jsPDF } from "jspdf";
import { format } from "@/libs/vueCurrencyInput.js";
import { useNumberHelper } from "@/compositionApi/useNumberHelper";
import store from "../store";
import { DateTime } from "luxon";

// import { getCHDFPDFTemplate } from "@/data/pdfConfigs";
// import { form_data } from "@/data/formData";
// import { options_data } from "@/data/options";

let debug = false;
let pdfTemplate = {}; //getCHDFPDFTemplate(1, "100000004");
let pdfData = {}; //form_data;
let optionSet = {}; //options_data;

let pxPageHeight = 0;
let pxPageWidth = 0;
let margin = [92, 40, 40, 40];
const fontSet = "arial, sans-serif, yahei";

let rootNode;

const cssClasses = {
    section: { "margin-bottom": "0px" },
    field: { "margin-bottom": "0px" },
    h1: {
        "font-size": "30px",
        "font-family": fontSet,
        "font-weight": "bold",
        "margin-bottom": "0px"
    },
    h2: {
        "font-size": "26px",
        "font-family": fontSet,
        "font-weight": "bold",
        "margin-bottom": "0px"
    },
    h3: {
        "font-size": "22px",
        "font-family": fontSet,
        "font-weight": "bold",
        "margin-bottom": "0px"
    },
    h4: {
        "font-size": "18px",
        "font-family": fontSet,
        "font-weight": "bold",
        "margin-bottom": "0px"
    },
    label: {
        "font-size": "18px",
        "font-family": fontSet,
        "margin-bottom": "0px",
        display: "block"
    },
    sub_label: {
        "font-size": "18px",
        "font-family": fontSet,
        "margin-bottom": "0px",
        color: "DimGray",
        display: "block"
    },
    span: {
        "font-size": "16px",
        "font-family": fontSet,
        "font-style": "italic",
        "margin-left": "10px",
        "margin-bottom": "0px",
        color: "DimGray",
        display: "block"
    },
    table: {
        "font-family": fontSet,
        "border-spacing": "0px",
        "margin-bottom": "0px",
        width: "100%"
    },
    table_responsive: {
        "font-family": fontSet,
        "border-spacing": "0px",
        "background-color": "#cccccc",
        width: "100%"
    },
    table_responsive_alt: {
        "font-family": fontSet,
        "border-spacing": "0px",
        "background-color": "#eeeeee",
        width: "100%"
    },
    tr: { "background-color": "#cccccc" },
    th: {
        "font-size": "16px",
        "font-weight": "bold",
        "text-align": "left",
        border: "1px solid #fff",
        padding: "10px"
    },
    th_rsp: {
        "font-size": "16px",
        "font-weight": "bold",
        "text-align": "left",
        border: "1px solid #fff",
        padding: "10px",
        width: "40%"
    },
    td: { "font-size": "16px", "text-align": "left", border: "1px solid #fff", padding: "10px" },
    td_rsp: {
        "font-size": "16px",
        "text-align": "left",
        border: "1px solid #fff",
        padding: "10px",
        width: "60%"
    },
    no_data_td: {
        "font-size": "16px",
        "text-align": "center",
        border: "1px solid #fff",
        padding: "10px"
    }
};

function addLogo(pdf) {
    let totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.addImage("/img/cra-logo.png", "PNG", 40, 10, 248, 72);
    }
}

function addFooters(pdf) {
    const pageCount = pdf.internal.getNumberOfPages();
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8);
    for (var i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.text(
            "Page " + String(i) + " of " + String(pageCount),
            40, // pdf.internal.pageSize.width / 2,
            pdf.internal.pageSize.height - 20,
            {
                align: "left"
            }
        );
    }
}

function formatString(s, vals) {
    let str = s;
    if (vals.length > 0) {
        for (let i = 0; i < vals.length; i++) {
            let reg = new RegExp("\\{" + i + "\\}", "gm");
            let val = vals[i] + "";
            val = val && val.trim() ? val.trim() : "";
            str = str.replace(reg, val);
        }
    }
    return str;
}

function hasSpace(node, mb) {
    let result = true;
    let rootRect = rootNode.getBoundingClientRect();
    let availableSpace = pxPageHeight - (rootRect.height % pxPageHeight);
    if (node) {
        let testDiv = createElement("div", {
            style: {
                width: pxPageWidth + "px"
            }
        });
        let marginBottom = mb ? mb : 0;
        document.body.appendChild(testDiv);
        testDiv.appendChild(node);
        try {
            var nodeRect = node.getBoundingClientRect();
            //if (nodeRect.height + marginBottom > availableSpace) {
            //console.log(node.innerHTML);
            //}
            result = nodeRect.height + marginBottom <= availableSpace;
        } catch (error) {
            console.log(error);
        }
        document.body.removeChild(testDiv);
    } else {
        result = mb <= availableSpace;
    }
    return result;
}

function hasSpaceTableRow(node) {
    let result = true;
    let tableNode = createElement("table", {
        style: cssClasses.table
    });
    tableNode.appendChild(node);

    let rootRect = rootNode.getBoundingClientRect();
    let availableSpace = pxPageHeight - (rootRect.height % pxPageHeight);
    let testDiv = createElement("div", {
        style: {
            width: pxPageWidth + "px"
        }
    });
    document.body.appendChild(testDiv);
    testDiv.appendChild(tableNode);
    try {
        var nodeRect = tableNode.getBoundingClientRect();
        // if (nodeRect.height > availableSpace) {
        //     console.log(node.innerHTML);
        // }
        result = nodeRect.height <= availableSpace;
    } catch (error) {
        console.log(error);
    }
    document.body.removeChild(testDiv);
    return result;
}

function hasSpaceWidth(node) {
    let result = true;
    let testDiv = createElement("div", {
        style: {
            width: pxPageWidth + "px"
        }
    });
    document.body.appendChild(testDiv);
    testDiv.appendChild(node);
    try {
        var clientRect = node.getBoundingClientRect();
        result = clientRect.width <= pxPageWidth;
    } catch (error) {
        console.log(error);
    }
    document.body.removeChild(testDiv);
    return result;
}

function createPageBreaker() {
    let clientRect = rootNode.getBoundingClientRect();
    var pageBreak = createElement("div", {
        // innerHTML: debug
        //     ? "Page Height:" +
        //       pxPageHeight +
        //       "px<br/>" +
        //       "Page Width:" +
        //       pxPageWidth +
        //       "px<br/>" +
        //       "Content:" +
        //       (clientRect.height + 30) +
        //       "px<br/>" +
        //       "Page Content:" +
        //       ((clientRect.height + 30) % pxPageHeight) +
        //       "px<br/>" +
        //       "Page Break:" +
        //       (pxPageHeight - ((clientRect.height + 30) % pxPageHeight)) +
        //       "px<br/>"
        //     : "",
        style: {
            display: "block",
            height: pxPageHeight - (clientRect.height % pxPageHeight) + "px",
            "background-color": debug ? "#FADBD8" : "none"
        }
    });
    return pageBreak;
}

function createMarginBlock(parentNode, h) {
    var mb = createElement("div", {
        style: {
            display: "block",
            height: h + "px",
            "background-color": debug ? "none" : "none"
        }
    });
    parentNode.appendChild(mb);
}

function createElement(tagName, opt) {
    var el = document.createElement(tagName);
    if (opt) {
        if (opt.className) el.className = opt.className;
        if (opt.innerHTML) {
            el.innerHTML = opt.innerHTML;
            var scripts = el.getElementsByTagName("script");
            for (var i = scripts.length; i-- > 0; null) {
                scripts[i].parentNode.removeChild(scripts[i]);
            }
        }
        for (let key in opt.style) {
            el.style[key] = opt.style[key];
        }
        for (let key in opt.attr) {
            el.setAttribute(key, opt.attr[key]);
        }
    }
    return el;
}

function createHTMLContent() {
    rootNode = createElement("div", {
        style: {
            width: pxPageWidth + "px",
            "background-color": debug ? "#D5F5E3" : "none"
        }
    });
    document.body.appendChild(rootNode);
    try {
        if (pdfTemplate.text) {
            let titleNode = createElement("h1", {
                innerHTML: pdfTemplate.text,
                style: cssClasses.h1
            });
            rootNode.appendChild(titleNode);
            createMarginBlock(rootNode, 30);
        }

        let pages = pdfTemplate.pages;
        pages.forEach((page, index) => {
            let isVisible = true;
            if (page.condition) {
                let properties = page.condition.properties.map(p => {
                    return getFieldData({ data: pdfData, fieldName: p });
                });
                let statement = formatString(page.condition.rule, properties);
                isVisible = eval(statement);
            }

            if (isVisible) {
                createPage(rootNode, page);
                if (index < pages.length - 1) {
                    let pageBreak = createPageBreaker();
                    rootNode.appendChild(pageBreak);
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
    document.body.removeChild(rootNode);
    return rootNode;
}

function createPage(parentNode, page) {
    let pageNode = createElement("div");
    parentNode.appendChild(pageNode);
    if (page.text) {
        let pageTitle = createElement("h2", {
            innerHTML: page.text,
            style: cssClasses.h2
        });
        pageNode.appendChild(pageTitle);
        createMarginBlock(pageNode, 10);
    }
    if (page.sections) {
        let sections = page.sections;
        sections.forEach(section => {
            let isValid = true;
            if (section.skip) {
                isValid = false;
            } else if (section.condition) {
                let properties = section.condition.properties.map(p => {
                    return getFieldData({ data: pdfData, fieldName: p });
                });
                let statement = formatString(section.condition.rule, properties);
                isValid = eval(statement);
            }

            if (isValid) {
                createSection(pageNode, section);
            }
        });
    }
    return pageNode;
}

function createSection(parentNode, section) {
    let sectionNode = createElement("div", {
        style: cssClasses.section
    });
    parentNode.appendChild(sectionNode);
    if (section.text) {
        let sectionTitle = createElement("h3", {
            innerHTML: section.text,
            style: cssClasses.h3
        });
        if (!hasSpace(sectionTitle, 10)) {
            let pageBreak = createPageBreaker();
            sectionNode.appendChild(pageBreak);
        }
        sectionNode.appendChild(sectionTitle);
        createMarginBlock(sectionNode, 10);
    }
    if (section.fields) {
        let fields = section.fields;
        fields.forEach(field => {
            let isValid = true;
            if (field.skip) {
                isValid = false;
            } else if (field.condition) {
                let properties = field.condition.properties.map(p => {
                    return getFieldData({ data: pdfData, fieldName: p });
                });
                let statement = formatString(field.condition.rule, properties);
                isValid = eval(statement);
            }

            if (isValid) {
                createField(sectionNode, field);
            }
        });
    }
    return sectionNode;
}

function createField(parentNode, field) {
    let fieldNode = createElement("div");
    parentNode.appendChild(fieldNode);
    if (field.text) {
        let fieldLabel = createElement("label", {
            innerHTML: field.text,
            style: field.title_class ? cssClasses[field.title_class] : cssClasses.label
        });
        if (!hasSpace(fieldLabel, 10)) {
            let pageBreak = createPageBreaker();
            fieldNode.appendChild(pageBreak);
        }
        fieldNode.appendChild(fieldLabel);
        createMarginBlock(fieldNode, 10);
    }
    if (field.value) {
        if (field.type === "Adhoc_Table") {
            let fieldData = getFieldData({ data: pdfData, fieldName: field.value });
            createAdhocTable(fieldNode, fieldData, field.template);
        } else if (field.cols) {
            let fieldData = getFieldData({ data: pdfData, fieldName: field.value });
            createHTMLTable(fieldNode, fieldData, field.cols);
        } else {
            let fieldValue = getFieldData({
                data: pdfData,
                fieldName: field.value,
                listName: field.list,
                currencyOption: field.currencyFormat,
                type: field.type,
                defaultVal: "--"
            });
            let fieldDataNode = createElement("span", {
                innerHTML: fieldValue,
                style: cssClasses.span
            });
            if (!hasSpace(fieldDataNode, 10)) {
                let pageBreak = createPageBreaker();
                fieldNode.appendChild(pageBreak);
            }
            fieldNode.appendChild(fieldDataNode);
            createMarginBlock(fieldNode, 10);
        }
    }
    return fieldNode;
}

function createHTMLTableHeader(cols) {
    let headerRow = createElement("tr", {
        style: cssClasses.tr
    });
    cols.forEach(col => {
        headerRow.appendChild(
            createElement("th", {
                innerHTML: col.text,
                style: cssClasses.th
            })
        );
    });
    return headerRow;
}

function createHTMLTable(parentNode, data, cols) {
    let tableNode = createElement("table", {
        style: cssClasses.table
    });
    let headerRow = createHTMLTableHeader(cols);
    tableNode.appendChild(headerRow);
    if (hasSpaceWidth(tableNode)) {
        if (Array.isArray(data) && data.length > 0) {
            data.forEach((rowData, index) => {
                let dataRow = createElement("tr", {
                    style: cssClasses.tr
                });
                cols.forEach(col => {
                    let dataCell = createElement("td", {
                        innerHTML: getFieldData({
                            data: rowData,
                            conditionalValue: col.conditionalValue,
                            fieldName: col.value,
                            listName: col.list,
                            currencyOption: col.currencyFormat,
                            type: col.type,
                            join: col.join,
                            prop: col.prop,
                            defaultValue: "--"
                        }),
                        style: cssClasses.td
                    });
                    dataRow.appendChild(dataCell);
                });
                if (index !== 0 && !hasSpaceTableRow(dataRow)) {
                    let pageBreak = createPageBreaker();
                    parentNode.appendChild(pageBreak);
                    tableNode = createElement("table", {
                        style: cssClasses.table
                    });
                    let newHeader = headerRow.cloneNode(true);
                    tableNode.appendChild(newHeader);
                    parentNode.appendChild(tableNode);
                }
                tableNode.appendChild(dataRow);
                if (index === 0) {
                    if (!hasSpace(tableNode)) {
                        let pageBreak = createPageBreaker();
                        parentNode.appendChild(pageBreak);
                    }
                    parentNode.appendChild(tableNode);
                }
            });
        } else {
            let noDataRow = createElement("tr", {
                style: cssClasses.tr
            });
            let noDataCell = createElement("td", {
                innerHTML: "No data available in table",
                style: cssClasses.no_data_td,
                attr: {
                    colspan: cols.length
                }
            });
            noDataRow.appendChild(noDataCell);
            tableNode.appendChild(noDataRow);

            if (!hasSpace(tableNode)) {
                let pageBreak = createPageBreaker();
                parentNode.appendChild(pageBreak);
            }
            parentNode.appendChild(tableNode);
        }
        if (hasSpace(null, 10)) {
            createMarginBlock(parentNode, 10);
        }
    } else {
        createResponsiveHTMLTable(parentNode, data, cols);
    }

    return tableNode;
}

function createResponsiveHTMLTable(parentNode, data, cols) {
    let node = createElement("div");
    parentNode.appendChild(node);
    if (Array.isArray(data)) {
        data.forEach((rowData, index1) => {
            if (index1 !== 0) {
                let divider = createElement("hr", {
                    style: {
                        "border-bottom": "thin solid #999",
                        margin: "20px 0"
                    }
                });
                node.appendChild(divider);
            }

            let tableNode = createElement("table", {
                style: cssClasses.table_responsive
            });

            cols.forEach((col, index2) => {
                let tableRow = createElement("tr");
                let headerCell = createElement("th", {
                    innerHTML: col.text,
                    style: cssClasses.th_rsp
                });
                let dataCell = createElement("td", {
                    innerHTML: getFieldData({
                        data: rowData,
                        conditionalValue: col.conditionalValue,
                        fieldName: col.value,
                        listName: col.list,
                        currencyOption: col.currencyFormat,
                        type: col.type,
                        join: col.join,
                        prop: col.prop,
                        defaultValue: "--"
                    }),
                    style: cssClasses.td_rsp
                });

                tableRow.appendChild(headerCell);
                tableRow.appendChild(dataCell);

                if (index2 === 0) {
                    if (!hasSpaceTableRow(tableRow)) {
                        let pageBreak = createPageBreaker();
                        node.appendChild(pageBreak);
                    }
                    node.appendChild(tableNode);
                } else {
                    if (!hasSpaceTableRow(tableRow)) {
                        let pageBreak = createPageBreaker();
                        node.appendChild(pageBreak);
                        tableNode = createElement("table", {
                            style: cssClasses.table_responsive
                        });
                        node.appendChild(tableNode);
                    }
                }
                tableNode.appendChild(tableRow);
            });
        });
        if (hasSpace(null, 10)) {
            createMarginBlock(parentNode, 10);
        }
    } else {
        node.appendChild(
            createElement("label", {
                innerHTML: "No data available in table",
                style: cssClasses.label
            })
        );
    }
    return node;
}

function createAdhocTable(parentNode, tableData, template) {
    let node = createElement("table", {
        style: cssClasses.table
    });
    if (Array.isArray(template)) {
        template.forEach((row, index1) => {
            if (Array.isArray(row)) {
                let tableRow = createElement("tr", {
                    style: cssClasses.tr
                });
                row.forEach((cell, index2) => {
                    let cellType = cell.type ? cell.type : "td";
                    let cellContent = cell.text
                        ? cell.text
                        : cell.value
                        ? getFieldData({
                              data: tableData,
                              fieldName: cell.value,
                              listName: cell.list,
                              currencyOption: {
                                  currency: null
                              },
                              formulate: cell.formulate,
                              defaultValue: "--"
                          })
                        : "";
                    let tableCell = createElement(cellType, {
                        innerHTML: cellContent,
                        style: { ...cssClasses[cellType], ...{ width: template[0][index2].width } },
                        attr: {
                            colspan: cell.colspan
                        }
                    });
                    tableRow.appendChild(tableCell);
                });
                if (index1 > 1 && !hasSpaceTableRow(tableRow)) {
                    let pageBreak = createPageBreaker();
                    parentNode.appendChild(pageBreak);
                    node = createElement("table", {
                        style: cssClasses.table
                    });
                    parentNode.appendChild(node);
                }
                node.appendChild(tableRow);
                if (index1 === 1) {
                    if (!hasSpace(node)) {
                        let pageBreak = createPageBreaker();
                        parentNode.appendChild(pageBreak);
                    }
                    parentNode.appendChild(node);
                }
            } else if (row.type === "table") {
                let subTableData = getFieldData({
                    data: tableData,
                    fieldName: row.value
                });

                if (Array.isArray(subTableData) && Array.isArray(row.cols)) {
                    subTableData.forEach(subTableDataRow => {
                        let subTableRow = createElement("tr", {
                            style: cssClasses.tr
                        });

                        row.cols.forEach((col, index2) => {
                            let colContent = col.text
                                ? col.text
                                : col.value
                                ? getFieldData({
                                      data: subTableDataRow,
                                      fieldName: col.value,
                                      listName: col.list,
                                      currencyOption: {
                                          currency: null
                                      },
                                      formulate: col.formulate,
                                      defaultValue: "--"
                                  })
                                : "";

                            let subTableCell = createElement("td", {
                                innerHTML: colContent,
                                style: {
                                    ...cssClasses.td,
                                    ...{ width: template[0][index2].width }
                                },
                                attr: {
                                    colspan: col.colspan
                                }
                            });
                            subTableRow.appendChild(subTableCell);
                        });
                        if (index1 > 1 && !hasSpaceTableRow(subTableRow)) {
                            let pageBreak = createPageBreaker();
                            parentNode.appendChild(pageBreak);
                            node = createElement("table", {
                                style: cssClasses.table
                            });
                            parentNode.appendChild(node);
                        }
                        node.appendChild(subTableRow);
                        if (index1 === 1) {
                            if (!hasSpace(node)) {
                                let pageBreak = createPageBreaker();
                                parentNode.appendChild(pageBreak);
                            }
                            parentNode.appendChild(node);
                        }
                    });
                }
            }
        });
    }
    if (hasSpace(null, 10)) {
        createMarginBlock(parentNode, 10);
    }
    return node;
}

function resolvePath(data, path, defaultValue) {
    console.log("path: " + path);
    if (!path) return defaultValue;
    console.log(path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), data));
    return path.split(".").reduce((o, p) => (o ? o[p] : defaultValue), data);
}

//data, fieldName, listName, type, defaultValue
function getFieldData(opt) {
    let defaultVal = opt.defaultVal ? opt.defaultVal : "";
    let fieldValue = defaultVal;
    // console.log("fieldName: "+opt.fieldName);
    // console.log("fieldValue: "+fieldValue);
    // console.log("conditionalValue: "+opt.conditionalValue);

    if (opt.conditionalValue) {
        let properties = opt.conditionalValue.properties.map(p => {
            return getFieldData({ data: opt.data, fieldName: p });
        });
        let statement = formatString(opt.conditionalValue.rule, properties);
        fieldValue = eval(statement);
    } else {
        fieldValue = resolvePath(opt.data, opt.fieldName, defaultVal);
    }

    if (opt.type === "Boolean") {
        return fieldValue ? "Yes" : fieldValue == false ? "No" : defaultVal;
    }

    if (opt.type === "Date") {
        return fieldValue
            ? isNaN(Date.parse(fieldValue))
                ? defaultVal
                : DateTime.fromISO(fieldValue).toFormat("dd-MM-yyyy")
            : defaultVal;
    }

    if (opt.listName) {
        let list = optionSet[opt.listName];
        if (list) {
            let listItem = list.find(item => item.value == fieldValue);
            if (listItem) {
                if (listItem.label === undefined) {
                    return listItem.name;
                }
                return listItem.label;
            }
        }
    }

    if (opt.currencyOption && useNumberHelper().isNumeric(fieldValue)) {
        // fieldValue = format(fieldValue, opt.currencyOption);
        fieldValue = useNumberHelper().toCurrency(fieldValue);
    }

    if (opt.formulate) {
        let formulate = opt.formulate.split(":");
        let method = formulate[0];
        let args = formulate[1];

        if (method === "year") {
            fieldValue = getYearVal(fieldValue, args);
        } else if (method === "ytd") {
            fieldValue = getYTDVal(fieldValue, args);
        }
    }

    if (opt.join && Array.isArray(fieldValue)) {
        if (opt.prop) {
            fieldValue = fieldValue.map(x => x[opt.prop]);
        }
        fieldValue = fieldValue.join(", ");
    }

    if (fieldValue == 0) {
        // handle when subtotal = 0 -> convert to string to export PDF
        fieldValue = String(fieldValue);
    }
    return fieldValue ? fieldValue : defaultVal;
}

function getYearVal(data, arg) {
    if (data) {
        let year = parseInt(data.substring(0, 4));
        let offset = parseInt(arg);
        if (year && offset) {
            return year + offset;
        }
    }
    return "Year" + arg;
}

function getYTDVal(data) {
    if (data) {
        let year = parseInt(data.substring(0, 4));
        let month = parseInt(data.substring(5));
        if (month && year) {
            return getMonthText(month) + " " + year;
        }
    }
    return "YTD";
}

function getMonthText(num) {
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    return months[num - 1];
}

function isDisplayBillingInfo() {
    if (window.loginData) {
        if (window.loginData.category !== "" && window.loginData.categoryName !== "") {
            if (
                window.loginData.category == "100000003" &&
                window.loginData.categoryName == "SEL CAT C2"
            ) {
                return "Yes";
            }
        } else {
            return "No";
        }
    } else {
        return "No";
    }
}

function ParseDatafromStore() {
    // section 1
    // 1A
    pdfData.Personal_Data_Name = store.state.section1.name;
    pdfData.Personal_Data_Gender = store.state.section1.gender;
    // 1B
    pdfData.Personal_Data_Citizenship = store.state.section1BCitizen.citizenshipType;
    pdfData.Personal_Data_NRIC = store.state.section1BCitizen.nric;
    pdfData.Sec_1B_Yes_Table = store.state.section1BCitizen.citizenshipTable;
    pdfData.Sec_1B_Checkbox = store.state.section1BCitizen.haveOtherCitizenship;
    pdfData.Sec_1B_P_Checkbox = store.state.section1BPassport.haveBeenIssuedPassport;
    pdfData.Sec_1B_P_Yes_Table = store.state.section1BPassport.passportTable;
    // 1C
    pdfData.Sec_1C_Date_of_Birth = store.state.section1.dateOfBirth;
    pdfData.Sec_1C_Country_of_Birth = store.state.section1.countryOfBirth;
    // 1D
    pdfData.Sec_1D_Address_Type = store.state.section1D.residentAddressType;
    pdfData.Sec_1D_Blk = store.state.section1D.residentBlk;
    pdfData.Sec_1D_Street = store.state.section1D.residentStreet;
    pdfData.Sec_1D_Floor = store.state.section1D.residentFloor;
    pdfData.Sec_1D_Unit = store.state.section1D.residentUnit;
    pdfData.Sec_1D_Building = store.state.section1D.residentBuilding;
    pdfData.Sec_1D_Postal_Code = store.state.section1D.residentPostalCode;
    pdfData.Sec_1D_Country = store.state.section1D.residentCountry;
    // 1E
    pdfData.Sec_1E_Checkbox = store.state.section1E.haveSameAddressWithResident;
    pdfData.Sec_1E_Address_Type = store.state.section1E.mailingAddressType;
    pdfData.Sec_1E_Blk = store.state.section1E.mailingBlk;
    pdfData.Sec_1E_Street = store.state.section1E.mailingStreet;
    pdfData.Sec_1E_Floor = store.state.section1E.mailingFloor;
    pdfData.Sec_1E_Unit = store.state.section1E.mailingUnit;
    pdfData.Sec_1E_Building = store.state.section1E.mailingBuilding;
    pdfData.Sec_1E_Postal_Code = store.state.section1E.mailingPostalCode;
    pdfData.Sec_1E_Country = store.state.section1E.mailingCountry;
    // 1F
    pdfData.Sec_1F_Home_Number_Country_Code = store.state.section1F.homeTelCountryCode;
    pdfData.Sec_1F_Home_Number_Area_Code = store.state.section1F.homeTelAreaCode;
    pdfData.Sec_1F_Home_Number_Number = store.state.section1F.homeTelNumber;
    pdfData.Sec_1F_Mobile_Number_Country_Code = store.state.section1F.mobilePhoneCountryCode;
    pdfData.Sec_1F_Mobile_Number_Area_Code = store.state.section1F.mobilePhoneAreaCode;
    pdfData.Sec_1F_Mobile_Number_Number = store.state.section1F.mobilePhoneNumber;
    pdfData.Sec_1F_Office_Number_Country_Code = store.state.section1F.officeNumCountryCode;
    pdfData.Sec_1F_Office_Number_Area_Code = store.state.section1F.officeNumAreaCode;
    pdfData.Sec_1F_Office_Number_Number = store.state.section1F.officeNum;
    pdfData.Sec_1F_Office_Number_Extension = store.state.section1F.officeNumExtension;
    pdfData.Sec_1F_Personal_Email = store.state.section1F.personalEmail;
    pdfData.Sec_1F_Work_Email = store.state.section1F.workEmail;
    pdfData.Sec_1F_Checkbox = store.state.section1F.telAndEmailAgreement;
    // 1G
    pdfData.Sec_1G_Race = store.state.section1.race;
    // 1H
    pdfData.Sec_1H_Checkbox = store.state.section1H.haveOtherNames;
    pdfData.Sec_1H_Yes_Table = store.state.section1H.otherNameTable;
    // 1I
    pdfData.Sec_1I_Checkbox = store.state.section1I.haveDistinguishingCharacteristic;
    pdfData.Sec_1I_Yes_Table = store.state.section1I.characteristicTable;

    // 2
    pdfData.Sec_2A_Yes_Table = store.state.section2.residentTable;

    //3
    pdfData.Sec_3A_Marital = store.state.section3.maritalStatus;
    pdfData.Sec_3A_Yes_Table = store.state.section3.maritalTable;

    //4
    pdfData.Sec_6A_Checkbox = store.state.section4A.hasEmploymentData;
    pdfData.Sec_6A_Yes_Table = store.state.section4A.employmentTable;

    //4B-i
    pdfData.Sec_6B_i_Checkbox = store.state.section4BDischarge.hasDischarged;
    pdfData.Sec_6B_i_Yes_Table = store.state.section4BDischarge.dischargeTable;

    // 4B-ii
    pdfData.Sec_6B_ii_Checkbox =
        store.state.section4BChargedWithInfraction.haveChargedWithInfraction;
    pdfData.Sec_6B_ii_Yes_Table =
        store.state.section4BChargedWithInfraction.chargedWithInfractionTable;

    //4C
    pdfData.Sec_6E_Checkbox = store.state.section4C.hasLicenses;
    pdfData.Sec_6E_Yes_Table = store.state.section4C.licenseTable;

    //4D
    pdfData.Sec_6J_i_Checkbox = store.state.section4D.haveRelate;
    pdfData.Sec_6J_i_Yes_Table = store.state.section4D.relateTable;

    //5A
    pdfData.Sec_7A_Checkbox = store.state.section5A.haveEverBeenArrested;
    pdfData.Sec_7A_Yes_Table = store.state.section5A.arrestedTable;
    console.log(store.state.section5A.arrestedTable);

    //5B
    pdfData.Sec_7C_Checkbox = store.state.section5B.wasSubjectOfInvestigation;
    pdfData.Sec_7C_Yes_Table = store.state.section5B.subjectOfInvestigationTable;

    //5C_i
    pdfData.Sec_7D_i_Checkbox = store.state.section5CWitness.haveBeenAWitness;
    pdfData.Sec_7D_i_Yes_Table = store.state.section5CWitness.beenAWitnessTable;

    //5C_ii
    pdfData.Sec_7D_ii_Checkbox = store.state.section5CAppearBeforeFederal.haveAppearedBeforeFederal;
    pdfData.Sec_7D_ii_Yes_Table =
        store.state.section5CAppearBeforeFederal.appearedBeforeFederalTable;

    //5D
    pdfData.Sec_7E_Checkbox = store.state.section5D.haveReceivedPardon;
    pdfData.Sec_7E_Yes_Table = store.state.section5D.receivedPardonTable;

    //5E
    pdfData.Sec_7I_Checkbox = store.state.section5E.haveBeenBarredFromCasino;
    pdfData.Sec_7I_Yes_Table = store.state.section5E.barredFromCasinoTable;

    //6A
    pdfData.Sec_8A_Checkbox = store.state.section6A.hasAnyDept;
    pdfData.Sec_8A_Yes_Table = store.state.section6A.deptTable;

    //6B_i
    pdfData.Sec_8B_i_Checkbox = store.state.section6B1.haveAdjudicatedBankrupt;
    pdfData.Sec_8B_i_Yes_Table = store.state.section6B1.adjudicatedBankruptTable;

    //6B_ii
    pdfData.Sec_8B_iii_Checkbox = store.state.section6B2.isUnderDebtRepaymentProgram;
    pdfData.Sec_8B_iii_Yes_Table = store.state.section6B2.table;

    //6C
    pdfData.Sec_8C_Checkbox = store.state.section6C.isRelatedToBankruptEntity;
    pdfData.Sec_8C_Yes_Table = store.state.section6C.relatedBankruptTable;

    //6D
    pdfData.Sec_8D_Checkbox = store.state.section6D.hasBeenMonitored;
    pdfData.Sec_8D_Yes_Table = store.state.section6D.monitoredTable;

    //6E
    pdfData.Sec_8E_Checkbox = store.state.section6E.haveIncomeSubjectedToGarnishment;
    pdfData.Sec_8E_Yes_Table = store.state.section6E.incomeSubjectedTable;

    //6F
    pdfData.Sec_8F_Checkbox = store.state.section6F.haveAssetsRepossessed;
    pdfData.Sec_8F_Yes_Table = store.state.section6F.assetRepossessedTable;

    //6G
    pdfData.Sec_8G_Checkbox = store.state.section6G.haveOwnAssetInTrust;
    pdfData.Sec_8G_Yes_Table = store.state.section6G.ownAssetInTrustTable;

    //6H
    pdfData.Sec_8H_Checkbox = store.state.section6H.haveManageAssetInTrust;
    pdfData.Sec_8H_Yes_Table = store.state.section6H.manageAssetInTrustTable;

    //6I_i
    pdfData.Sec_8I_i_Checkbox = store.state.section6I1.haveBeenTheConduit;
    pdfData.Sec_8I_i_Yes_Table = store.state.section6I1.beenTheConduitTable;

    //6I_ii
    pdfData.Sec_8I_ii_Checkbox = store.state.section6I2.haveAssetUnderYourName;
    pdfData.Sec_8I_ii_Yes_Table = store.state.section6I2.assetUnderYourNameTable;

    //7A_Cash in bank
    pdfData.cashLatestGrossSalary = store.state.section7AssetCash.cashLatestGrossSalary;
    pdfData.cashOnHand = store.state.section7AssetCash.cashOnHand;
    pdfData.Sec_23_Asset_Cash_In_Bank = store.state.section7AssetCash.table;
    pdfData.AssetCashSubTotal = store.state.section7AssetCashSubTotal;

    //7A_Real Estate
    pdfData.Sec_23_Asset_Real_Estate = store.state.section7AssetRealEstate.table;
    pdfData.RealEstateSubTotal = store.state.section7RealEstateSubTotal;

    //7A_Vehicle
    pdfData.Sec_23_Asset_Vehicle = store.state.section7AssetVehicle.table;
    pdfData.VehicleSubTotal = store.state.section7VehicleSubTotal;

    //7A_Investment
    pdfData.Sec_23_Asset_Investment = store.state.section7AssetInvestment.table;
    pdfData.InvestmentSubTotal = store.state.section7InvestmentSubTotal;

    //7A_Others
    pdfData.Sec_23_Asset_Others = store.state.section7AssetOther.table;
    pdfData.OthersSubTotal = store.state.section7OthersSubTotal;

    //7A_Total Assets
    pdfData.TotalAssets = store.state.section7TotalAssets;

    //7B_Debt Repayment Program
    pdfData.Sec_23_Liabilities_Debt_Repayment_Program_Table =
        store.state.section7LiabilityDebtRepayment.deptRepaymentTable;
    pdfData.DebtRepaymentProgramSubTotal = store.state.section7DebtRepaymentProgramSubTotal;

    //7B_Licensed Money Lenders
    pdfData.Sec_23_Liabilities_Licensed_Money_Lenders_Table =
        store.state.section7LiabilityLicensedMoneyLenders.table;
    pdfData.Sec_23_Liabilities_Licensed_Money_Lenders_Checkbox =
        store.state.section7LiabilityLicensedMoneyLenders.wasBorrowedFromLML;
    pdfData.LicensedMoneyLendersSubTotal = store.state.section7LicensedMoneyLendersSubTotal;

    //7B_Unlicensed Money Lenders
    pdfData.Sec_23_Liabilities_Unlicensed_Money_Lenders_Table =
        store.state.section7LiabilityUnlicensedMoneyLender.table;
    pdfData.Sec_23_Liabilities_Unlicensed_Money_Lenders_Checkbox =
        store.state.section7LiabilityUnlicensedMoneyLender.wasBorrowedFromUML;
    pdfData.UnlicensedMoneyLendersSubTotal = store.state.section7UnLicensedMoneyLendersSubTotal;

    //7B_Credit Card
    pdfData.Sec_23_Liabilities_Credit_Card_Table = store.state.section7LiabilityCreditCard.table;
    pdfData.CreditCardSubTotal = store.state.section7CreditCardSubTotal;

    //7B_Overdraft
    pdfData.Sec_23_Liabilities_Overdraft_Table = store.state.section7LiabilityOverDraft.table;
    pdfData.OverdraftSubTotal = store.state.section7OverDraftSubTotal;

    //7B_Mortgage Loan
    pdfData.Sec_23_Liabilities_Mortgage_Loan_Table =
        store.state.section7LiabilityMortgageLoan.table;
    pdfData.MortgageLoanSubTotal = store.state.section7MortgageLoanSubTotal;

    //7B_Vehicle Loan
    pdfData.Sec_23_Liabilities_Vehicle_Loan_Table = store.state.section7LiabilityVehicleLoan.table;
    pdfData.VehicleLoanSubTotal = store.state.section7VehicleLoanSubTotal;

    //7B_Renovation Loan
    pdfData.Sec_23_Liabilities_Renovation_Loan_Table =
        store.state.section7LiabilityRenovationLoan.table;
    pdfData.RenovationLoanSubTotal = store.state.section7RenovationLoanSubTotal;

    //7B_Study Loan
    pdfData.Sec_23_Liabilities_Study_Loan_Table = store.state.section7LiabilityStudyLoan.table;
    pdfData.StudyLoanSubTotal = store.state.section7StudyLoanSubTotal;

    //7B_Other Loans
    pdfData.Sec_23_Liabilities_Other_Loan_Table = store.state.section7LiabilityOtherLoan.table;
    pdfData.OtherLoansSubTotal = store.state.section7OtherLoanSubTotal;

    //7B_Total Liabilities
    pdfData.TotalLiabilities = store.state.section7TotalLiabilities;

    //7B_Date of Statement
    pdfData.dateOfDeclaration = store.state.section7.dateOfDeclaration;

    //8
    store.state.section8.billingInforTable.map(item => {
        pdfData.businessName = item.businessName;
        pdfData.dateOfIncorporation = item.dateOfIncorporation;
        pdfData.countryOfIncorporation = item.countryOfIncorporation;
        pdfData.businessRegistrationNumber = item.businessRegistrationNumber;
        pdfData.businessAddress = item.businessAddress;
        pdfData.businessTelephoneNumber = item.businessTelephoneNumber;
        pdfData.businessFaxNumber = item.businessFaxNumber;
        pdfData.businessEmail = item.businessEmail;
        pdfData.websiteURL = item.websiteURL;
        item.contactPersonTable.map(x => {
            if (x.rowNo == 1) {
                pdfData.personOneName = x.name;
                pdfData.personOneContactNumber = x.contactNumber;
                pdfData.personOneEmailAddress = x.emailAddress;
                pdfData.personOnePositionHeld = x.positionHeld;
            } else if (x.rowNo == 2) {
                pdfData.personTwoName = x.name;
                pdfData.personTwoContactNumber = x.contactNumber;
                pdfData.personTwoEmailAddress = x.emailAddress;
                pdfData.personTwoPositionHeld = x.positionHeld;
            }
        });
    });

    pdfData.haveConsentElectricService = store.state.section8.haveConsentElectricService;
    pdfData.email = store.state.section8.email;
    pdfData.haveUnderstandEmailUsed = store.state.section8.haveUnderstandEmailUsed;
    pdfData.willProvideAcknowledgementReceipt =
        store.state.section8.willProvideAcknowledgementReceipt;

    pdfData.isDisplayBillingInfo = isDisplayBillingInfo();
    console.log("loginData PDF:" + JSON.stringify(window.loginData, null, 4));
    console.log("pdfData.isDisplayBillingInfo" + pdfData.isDisplayBillingInfo);
}

export function exportPDF(template = {}, options = {}, fileName) {
    ParseDatafromStore();
    let createPDFPromise = new Promise(function(resolve, reject) {
        pdfTemplate = template;
        optionSet = options;
        // pdfData = data;

        const pdf = new jsPDF({
            orientation: "p",
            format: [794, 1123],
            unit: "px",
            hotfixes: ["px_scaling"]
        });

        let name = fileName ? fileName : "pdf";

        //pdf.addFont("font/Microsoft Yahei.ttf", "yahei", "normal");
        //pdf.setFont("yahei", "normal"); // set font

        pxPageHeight = pdf.getPageHeight() - margin[0] - margin[2];
        pxPageWidth = pdf.getPageWidth() - margin[1] - margin[3];

        const htmlContent = createHTMLContent();
        pdf.html(htmlContent, {
            callback: function(doc) {
                addLogo(doc);
                addFooters(doc);
                doc.save(name + ".pdf");
                resolve("resolved");
            },
            //autoPaging: "text",
            margin: margin,
            html2canvas: {
                scale: 1
            }
        });
        console.log(htmlContent);
    });

    return createPDFPromise;
}
