class CountHolidayWidget {
  constructor(arg) {
    this.arg = arg;
    this.widgetSize = config.widgetFamily;
    this.ratio = Device.screenSize().width / 414;
  }

  render() {
    if (this.widgetSize === "medium") {
      return this.renderMedium();
    } else if (this.widgetSize === "large") {
      return this.renderLarge();
    } else {
      return this.renderSmall();
    }
  }
  renderSmall() {
    let w = new ListWidget();
    w.addText("暂不支持该尺寸组件");
    return w;
  }

  renderMedium() {
    let w = new ListWidget();
    let count = 0;
    let { total, used } = this.calculator();
    let title = w.addText(`2021年的休息日还剩 ${total - used} 天`);
    title.font = new Font("PingFangSC-Semibold", 15 * this.ratio);
    title.textColor = new Color("#666666");
    title.centerAlignText();
    w.addSpacer(10 * this.ratio);
    for (let i = 0; i < 5; i++) {
      let s = w.addStack();
      for (let j = 0; j < 23; j++) {
        let content = s.addText("●");
        content.font = Font.lightSystemFont(15 * this.ratio);
        content.textColor =
          count < used ? new Color("#c35d55") : new Color("#008e9d");
        count++;
        if (count == total) break;
      }
      if (count == total) break;
    }
    let gradient = new LinearGradient();
    gradient.locations = [0, 1];
    gradient.colors = [new Color("#Fad300"), new Color("#F7A11C")];
    w.backgroundGradient = gradient;
    return w;
  }

  renderLarge() {
    let w = new ListWidget();
    let count = 0;
    let { total, used } = this.calculator();
    let title = w.addText(`2021年的休息日还剩 ${total - used} 天`);
    title.font = new Font("PingFangSC-Semibold", 20 * this.ratio);
    title.textColor = new Color("#666666");
    title.centerAlignText();
    w.addSpacer(10 * this.ratio);
    for (let i = 0; i < 10; i++) {
      let s = w.addStack();
      for (let j = 0; j < 14; j++) {
        let content = s.addText("●");
        content.font = Font.lightSystemFont(25 * this.ratio);
        content.textColor =
          count < used ? new Color("#c35d55") : new Color("#008e9d");
        count++;
        if (count == total) break;
      }
      if (count == total) break;
    }
    let gradient = new LinearGradient();
    gradient.locations = [0, 1];
    gradient.colors = [new Color("#Fad300"), new Color("#F7A11C")];
    w.backgroundGradient = gradient;
    return w;
  }

  calculator() {
    let daysOff = [
      "0101",
      "0102",
      "0103",
      "0109",
      "0110",
      "0116",
      "0117",
      "0123",
      "0124",
      "0130",
      "0131",
      "0206",
      "0211",
      "0212",
      "0213",
      "0214",
      "0215",
      "0216",
      "0217",
      "0221",
      "0227",
      "0228",
      "0306",
      "0307",
      "0313",
      "0314",
      "0320",
      "0321",
      "0327",
      "0328",
      "0403",
      "0404",
      "0405",
      "0410",
      "0411",
      "0417",
      "0418",
      "0424",
      "0501",
      "0502",
      "0503",
      "0504",
      "0505",
      "0509",
      "0515",
      "0516",
      "0522",
      "0523",
      "0529",
      "0530",
      "0605",
      "0606",
      "0612",
      "0613",
      "0614",
      "0619",
      "0620",
      "0626",
      "0627",
      "0703",
      "0704",
      "0710",
      "0711",
      "0717",
      "0718",
      "0724",
      "0725",
      "0731",
      "0801",
      "0807",
      "0808",
      "0814",
      "0815",
      "0821",
      "0822",
      "0828",
      "0829",
      "0904",
      "0905",
      "0911",
      "0912",
      "0919",
      "0920",
      "0921",
      "0925",
      "1001",
      "1002",
      "1003",
      "1004",
      "1005",
      "1006",
      "1007",
      "1010",
      "1016",
      "1017",
      "1023",
      "1024",
      "1030",
      "1031",
      "1106",
      "1107",
      "1113",
      "1114",
      "1120",
      "1121",
      "1127",
      "1128",
      "1204",
      "1205",
      "1211",
      "1212",
      "1218",
      "1219",
      "1225",
      "1226",
    ];
    const format = (date) => {
      date = new Date(date);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      return `${formatNumber(month)}${formatNumber(day)}`;
    };
    const formatNumber = (n) => {
      n = n.toString();
      return n[1] ? n : "0" + n;
    };
    let target = "";
    let date = new Date();
    if (date.getFullYear() < 2021) {
      return {
        total: daysOff.length,
        used: 0,
      };
    }
    if (date.getFullYear() > 2021) {
      date = new Date("2021-12-31");
    }
    while (!daysOff.includes(target)) {
      target = format(date);
      date -= 1000 * 60 * 60 * 24;
    }
    return {
      total: daysOff.length,
      used: daysOff.indexOf(target) + 1,
    };
  }

  init() {
    if (!config.runsInWidget) return;
    let widget = this.render();
    Script.setWidget(widget);
    Script.complete();
  }
}
new CountHolidayWidget(args.widgetParameter).init();
