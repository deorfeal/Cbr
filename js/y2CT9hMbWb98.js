app = {
        utils: {}
    }, app.utils.getDirection = {
        direction: 1,
        lastScrollTop: 0,
        init: function () {
            var e = this;
            app.dom.$window.scroll(function () {
                var t = app.dom.$window.scrollTop();
                e.lastScrollTop !== t && (e.lastScrollTop < t ? e.direction = 1 : e.direction = -1, e.lastScrollTop = t)
            })
        }
    }, app.findWithRoot = function (t, e) {
        var a = $(t),
            i = a.find(e);
        return a.is(e) && (i = i.add(a)), i
    }, app.formatNumber = function (t) {
        return String(t).replace(/(?=\B(?:\d{3})+\b)/g, " ")
    }, app.declOfNum = function (t, e, a) {
        var i = e[4 < t % 100 && t % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][t % 10 < 5 ? t % 10 : 5]];
        return a ? t + " " + i : i
    }, app.onPressSpace = function (e, a) {
        app.dom.$window.on("keypress", function (t) {
            32 == t.keyCode && e.is(document.activeElement) && (t.preventDefault(), a && a.call(document.activeElement, t))
        })
    }, app.createRunOnceTimeout = function () {
        var a;
        return function (t, e) {
            clearTimeout(a), a = setTimeout(t, e)
        }
    }, app.regionsMap = function (t, c) {
        var e = app.findWithRoot(document, t);
        if (e.length) {
            var p = e[0],
                f = p.querySelector(".map"),
                h = document.querySelector('[name="zoom:lang"]').getAttribute("content"),
                a = document.querySelector("[data-url-regions]");
            if (void 0 === t || !f) throw p.style.display = "none", new Error("Неверный id");
            a && a.getAttribute("data-url-regions") && $.getJSON(a.getAttribute("data-url-regions"), function (t) {
                var n = t,
                    e = t,
                    i = {},
                    r = [];

                function a(t) {
                    Highcharts.mapChart(f, {
                        chart: {
                            backgroundColor: t && t.backgroundColor,
                            animation: !0,
                            height: 656,
                            margin: [0, 0, 0, 0],
                            events: {
                                load: function () {
                                    this.get("" + c).select(), o(c)
                                }
                            }
                        },
                        mapNavigation: {
                            enabled: t && t.isNavigation,
                            buttonOptions: {
                                verticalAlign: "top",
                                align: "right"
                            },
                            buttons: {
                                zoomIn: {
                                    text: "+",
                                    width: 30,
                                    height: 30,
                                    x: -10,
                                    style: {
                                        fontSize: "45px"
                                    }
                                },
                                zoomOut: {
                                    text: "−",
                                    width: 30,
                                    height: 30,
                                    x: -10,
                                    y: 52,
                                    style: {
                                        fontSize: "45px"
                                    }
                                }
                            }
                        },
                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    chart: {
                                        height: 457
                                    },
                                    plotOptions: {
                                        series: {
                                            point: {
                                                events: {
                                                    click: function () {
                                                        o(this.OKATO)
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    mapNavigation: {
                                        buttons: {
                                            zoomIn: {
                                                text: "+",
                                                width: 22,
                                                height: 22,
                                                x: -10,
                                                style: {
                                                    fontSize: "35px"
                                                }
                                            },
                                            zoomOut: {
                                                text: "−",
                                                width: 22,
                                                height: 22,
                                                x: -10,
                                                y: 42,
                                                style: {
                                                    fontSize: "35px"
                                                }
                                            }
                                        }
                                    },
                                    tooltip: {
                                        enabled: !1
                                    }
                                }
                            }, {
                                condition: {
                                    minWidth: 500
                                },
                                chartOptions: {
                                    plotOptions: {
                                        series: {
                                            point: {
                                                events: {
                                                    mouseOver: function () {
                                                        o(this.OKATO)
                                                    },
                                                    click: function () {
                                                        var e = this.OKATO;
                                                        i.RegionsLinks.forEach(function (t) {
                                                            t.OKATO === e && (window.location.href = t.url)
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }]
                        },
                        legend: {
                            enabled: !1
                        },
                        tooltip: {
                            stickOnContact: !0,
                            useHTML: !1,
                            followPointer: !1,
                            headerFormat: null,
                            pointFormat: "{point.NM}",
                            padding: 10,
                            backgroundColor: "#ffffff",
                            style: {
                                color: "#000000",
                                fontSize: "14px"
                            },
                            borderWidth: 0,
                            shadow: !0
                        },
                        series: [{
                            type: "map",
                            joinBy: "OKATO",
                            allowPointSelect: !0,
                            states: {
                                hover: {
                                    color: "#0088CB"
                                },
                                select: {
                                    color: "#0088CB"
                                }
                            },
                            color: "#8E96A3",
                            mapData: n,
                            data: e,
                            dataLabels: {
                                enabled: !0,
                                formatter: function () {
                                    if (window.innerWidth < 1024) return this.point.NM
                                },
                                verticalAlign: "right",
                                style: {
                                    fontWeight: 400,
                                    textAnchor: "middle",
                                    textOutline: "0.5px transparent",
                                    width: 130
                                },
                                textAlign: "center",
                                padding: 0,
                                position: "right",
                                inside: !0,
                                x: 65
                            }
                        }]
                    })
                }
                "interaction" === p.dataset.type ? a({
                    backgroundColor: "#F5F5F5",
                    isNavigation: !0
                }) : a({
                    backgroundColor: "#FFFFFF",
                    isNavigation: !1
                });
                "interaction" === p.dataset.type && (function () {
                    var t = document.createElement("div");
                    t.classList.add("regions-map__accordion-wrapper"), p.appendChild(t);
                    var e = document.createElement("button");
                    e.classList.add("accordion-title"), t.appendChild(e);
                    var a = document.createElement("div");
                    a.classList.add("accordion-block"), t.appendChild(a)
                }(), function () {
                    var t = document.querySelector(".accordion-title"),
                        e = document.querySelector(".accordion-block");
                    t.addEventListener("click", function () {
                        t.classList.toggle("active"), e.classList.toggle("active"), e.classList.contains("active") ? e.style.maxHeight = e.scrollHeight + "px" : e.style.maxHeight = ""
                    }), window.matchMedia("(min-width: 1023px)").matches && (t.classList.add("active"), e.classList.add("active"))
                }());

                function o(t) {
                    var e = p.dataset.type;
                    "interaction" === e ? d(t, e) : "static" === e && d(t, e)
                }

                function d(a, e) {
                    Object.keys(i).length ? (r = [], i.Data.forEach(function (e) {
                        e.OKATO === a && i.Indicators.forEach(function (t) {
                            t.id === e.Pok_id && (e.title = t.Title, r.push(e))
                        })
                    }), i.RegionsLinks.forEach(function (t) {
                        t.OKATO === a && (t.url = t.url.replace("http://", "https://"), r.push(t))
                    }), "interaction" === e ? s(a) : l()) : $.getJSON("" + p.getAttribute("data-url"), function (t) {
                        t.Data.forEach(function (e) {
                            e.OKATO === a && t.Indicators.forEach(function (t) {
                                t.id === e.Pok_id && (e.title = t.Title, r.push(e))
                            })
                        }), t.RegionsLinks.forEach(function (t) {
                            t.OKATO === a && (t.url = t.url.replace("http://", "https://"), r.push(t))
                        }), "interaction" === e ? s(a) : l(), i = t
                    })
                }

                function s(a) {
                    var i = document.querySelector(".accordion-title"),
                        d = document.querySelector(".accordion-block");
                    d.innerHTML = "", n.forEach(function (t, e) {
                        t.OKATO === a && (i.innerText = t.NM), 0 === e && (d.innerHTML = "")
                    }), r.forEach(function (t) {
                        if (t.val) {
                            var e = document.createElement("div");
                            e.classList.add("accordion-block__item");
                            var a = document.createElement("p"),
                                i = document.createElement("span");
                            e.appendChild(a), e.appendChild(i), d.appendChild(e), a.innerHTML = t && t.title, "" !== t.Trend && i.classList.add("" + t && t.Trend);
                            var n = t && t.val,
                                o = t && t.dim,
                                r = n.toFixed(t.prec);
                            "ru" === h && (r = new String(r).replace(/\./g, ",")), i.innerHTML = "%" === o ? r + o : r + " " + o
                        }
                    });
                    var e = document.createElement("a");
                    e.classList.add("accordion-block__item-link"), e.innerHTML = "Ссылка на регион", r.forEach(function (t) {
                        t.url && (e.href = t.url)
                    }), d.appendChild(e)
                }

                function l() {
                    var t = document.querySelector(".regions-map__block-details");
                    t && p.removeChild(t);
                    var o = document.createElement("div");
                    o.classList.add("regions-map__block-details"), p.appendChild(o), r.forEach(function (t) {
                        if (t.val) {
                            var e = document.createElement("div");
                            e.classList.add("regions-map__item-details");
                            var a = document.createElement("p");
                            a.classList.add("regions-map__item-details_title"), a.innerHTML = t.title;
                            var i = document.createElement("span");
                            "" !== t.Trend ? i.classList.add("regions-map__item-details_info", t && t.Trend) : i.classList.add("regions-map__item-details_info");
                            var n = t.val.toFixed(t.prec);
                            "ru" === h && (n = new String(n).replace(/\./g, ",")), "%" === t.dim ? i.innerHTML = n + t.dim : i.innerHTML = n + " " + t.dim, e.appendChild(a), e.appendChild(i), o.appendChild(e)
                        }
                    })
                }! function (t) {
                    if (t) {
                        var e = document.querySelector("body");
                        t.addEventListener("touchmove", function (t) {
                            t.preventDefault(), e.classList.add("no-scroll")
                        }), t.addEventListener("touchend", function () {
                            e.classList.remove("no-scroll")
                        })
                    }
                }(f)
            })
        }
    }, app.createChartTooltipPositioner = function (b) {
        return function (a, i, n) {
            function t(t) {
                var e = "x" === t;
                return [t, e ? l : c, e ? a : i].concat([e ? a : i, e ? n.plotX + d.plotLeft : n.plotY + d.plotTop, e ? d.plotLeft : d.plotTop, e ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight])
            }

            function e(t, e, a, i, n, o, r) {
                var d = "y" === t ? function (t) {
                        return m ? t * m.scaleY : t
                    }(h) : function (t) {
                        return m ? t * m.scaleX : t
                    }(h),
                    s = (a - i) / 2,
                    l = i < n - h,
                    c = n + h + i < e,
                    p = n - d - a + s,
                    f = n + d - s;
                if (v && c) u[t] = f;
                else if (!v && l) u[t] = p;
                else if (l) u[t] = Math.min(r - i, p - g < 0 ? p : p - g);
                else {
                    if (!c) return !1;
                    u[t] = Math.max(o, e < f + g + a ? f : f + g)
                }
            }

            function o(t) {
                var e = p;
                p = f, f = e, r = t
            }
            var r, d = this.chart,
                h = this.distance,
                u = {},
                g = d.inverted && n.h || 0,
                s = this.outside,
                l = s ? doc.documentElement.clientWidth - 2 * h : d.chartWidth,
                c = s ? Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, doc.body.offsetHeight, doc.documentElement.offsetHeight, doc.documentElement.clientHeight) : d.chartHeight,
                m = d.containerScaling,
                p = t("y"),
                f = t("x"),
                v = !this.followPointer && function () {
                    for (var t = arguments, e = t.length, a = 0; a < e; a++) {
                        var i = t[a];
                        if (null != i) return i
                    }
                }(n.ttBelow, !d.inverted == !!n.negative),
                _ = function () {
                    !1 !== e.apply(0, p) ? !1 !== function (t, e, a, i, n) {
                        var o;
                        return n < h || e - h < n ? o = !1 : u[t] = n < a / 2 ? 1 : e - i / 2 < n ? e - i - 2 : n - a / 2, o
                    }.apply(0, f) || r || (o(!0), _()) : r ? u.x = u.y = 0 : (o(!0), _())
                };
            return (d.inverted || 1 < this.len) && o(), _(), u.y = b, u
        }
    }, app.chartTooltipPositioner = app.createChartTooltipPositioner(10), app.createChartSharedTooltipFormatter = function (a) {
        return function () {
            return this.points.slice().sort(function (t, e) {
                return t.point.plotY - e.point.plotY
            }).reduce(function (t, e) {
                return t + '<div class="chart-tooltip-line"><div class="chart-tooltip-dot" style="color:' + e.color + '">●</div>' + (a ? "" : '<div class="chart-tooltip-series">' + e.series.name + ": </div>") + '<div class="chart-tooltip-value">' + e.y + (e.series.options.units || "") + "</div></div>"
            }, '<div class="chart-tooltip-header">' + this.x + "</div>")
        }
    }, app.chartAutoHeight = function (t, e, a, i) {
        a = a || 30, i = i || 400;
        var n, o = $("#" + t),
            r = !1;

        function d() {
            if (!e.options.legend.floating) {
                if (!r) return;
                return e.update({
                    legend: {
                        y: null
                    }
                }), void o.css("height", "")
            }
            var t = e.legend.legendHeight + a;
            e.update({
                legend: {
                    y: t
                }
            }), o.css("height", t + e.chartHeight + "px"), r = !0
        }
        setTimeout(d, i), $(window).on("resize", function () {
            clearTimeout(n), n = setTimeout(d, i)
        })
    }, app.charts = function () {
        "undefined" != typeof Highcharts && Highcharts.setOptions({
            title: {
                text: ""
            },
            subtitle: {
                text: ""
            },
            chart: {
                height: 400,
                spacingBottom: 0,
                animation: !1
            },
            xAxis: {
                gridLineWidth: 0,
                labels: {
                    style: {
                        color: "#2b2e33"
                    }
                }
            },
            yAxis: {
                gridLineWidth: 1,
                lineColor: "#E8E9EB",
                labels: {
                    style: {
                        color: "#2b2e33"
                    }
                },
                title: {
                    x: -17,
                    margin: 0,
                    style: {
                        color: "#2b2e33"
                    }
                }
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 927
                    }
                }]
            },
            tooltip: {
                useHTML: !0,
                headerFormat: '<div class="chart-tooltip-header">{point.key}</div>',
                pointFormat: '<div class="chart-tooltip-line"><div class="chart-tooltip-dot" style="color:{point.color}">●</div><div class="chart-tooltip-series">{series.name}: </div><div class="chart-tooltip-value">{point.y}</div></div>',
                style: {
                    color: "#ffffff"
                },
                padding: 0,
                shadow: !1,
                backgroundColor: "#36383d",
                borderRadius: 4,
                borderColor: "#36383d"
            },
            legend: {
                useHTML: !0,
                labelFormatter: function () {
                    var t = {
                        circle: "●",
                        diamond: "◆",
                        square: "◼",
                        triangle: "▲",
                        "triangle-down": "▼"
                    } [this.symbol || "circle"];
                    return '<span class="chart-legend-dot" style="color: ' + this.color + '">' + t + '</span><span class="chart-legend">' + this.name + "</span>"
                },
                itemDistance: 16,
                itemMarginBottom: 8,
                itemMarginTop: 0,
                padding: 0,
                squareSymbol: !1,
                symbolWidth: 0,
                symbolPadding: 0,
                symbolRadius: 0,
                align: "left",
                maxHeight: 1 / 0,
                width: "100%",
                x: -7
            },
            credits: {
                enabled: !1
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            legendItemClick: function () {
                                return !1
                            }
                        }
                    },
                    events: {
                        legendItemClick: function () {
                            return !1
                        }
                    }
                },
                column: {
                    borderWidth: 0,
                    pointPadding: 0,
                    groupPadding: .12
                },
                columnrange: {
                    stacking: "normal",
                    pointPadding: 0,
                    groupPadding: .1,
                    borderWidth: 0
                }
            }
        })
    }, app.charts(), app.chartsPrint = function (a) {
        window.addEventListener("beforeprint", function () {
            var t = document.querySelector(".highcharts-tooltip-box"),
                e = document.querySelector('div.highcharts-tooltip[style*="opacity: 1"]');
            t && e && (e.style.opacity = 0, t.style.opacity = 0), a.chartWidth = 800, a.containerWidth = 800, a.legend.chart.chartWidth = 800, a.renderer.width = 800, a.xAxis[0].update(["redraw"]), a.xAxis[0].render(), a.legend.update(["redraw"]), a.legend.render(), a.redraw(), a.render()
        }), window.addEventListener("afterprint", function () {
            var t = document.querySelector(".highcharts-tooltip-box"),
                e = document.querySelector('div.highcharts-tooltip[style*="opacity: 0"]');
            t && e && (e.style.opacity = 1, t.style.opacity = 1), a.legend.update(["redraw"]), a.xAxis[0].update(["redraw"]), a.xAxis[0].render()
        })
    }, app.chartsPrintLandscape = function (a) {
        window.addEventListener("beforeprint", function () {
            var t = document.querySelector(".highcharts-tooltip-box"),
                e = document.querySelector('div.highcharts-tooltip[style*="opacity: 1"]');
            t && e && (e.style.opacity = 0, t.style.opacity = 0), a.chartWidth = 1700, a.containerWidth = 1700, a.legend.chart.chartWidth = 1700, a.renderer.width = 1700, a.xAxis[0].update(["redraw"]), a.xAxis[0].render(), a.legend.update(["redraw"]), a.legend.render(), a.redraw(), a.render()
        }), window.addEventListener("afterprint", function () {
            var t = document.querySelector(".highcharts-tooltip-box"),
                e = document.querySelector('div.highcharts-tooltip[style*="opacity: 0"]');
            t && e && (e.style.opacity = 1, t.style.opacity = 1), a.legend.update(["redraw"]), a.xAxis[0].update(["redraw"]), a.xAxis[0].render()
        })
    }, app.chartLegendDataHighlighter = function (t, e) {
        var n, o = $("#" + t),
            r = "pie" === e.options.chart.type,
            a = o.find(".chart-legend").length;

        function d(t) {
            return r ? e.series[0].data[t] : e.series[t]
        }
        for (var s = 0; s < a; s++) ! function (a) {
            var t = r ? d(s).series.options : d(s).options;
            if (!t.dataLabels || !t.dataLabels.enabled) {
                var i = (r ? ".highcharts-color-" : ".highcharts-series-") + a + " .chart-legend";
                try {
                    o.get(0).addEventListener("mouseover", function (t) {
                        var e = $(t.target);
                        n !== a && e.is($(i)) && (null != n && d(n).update({
                            dataLabels: {
                                enabled: !1
                            }
                        }, !1), d(a).update({
                            dataLabels: {
                                enabled: !0
                            }
                        }), n = a)
                    }, !1)
                } catch (t) {
                    console.error(t)
                }
            }
        }(s);

        function i() {
            null != n && (d(n).update({
                dataLabels: {
                    enabled: !1
                }
            }), n = null)
        }
        o.add(o.find(".highcharts-legend")).on("mouseleave", i), o.find(".highcharts-root").on("mouseenter", i)
    }, app.menuSticky = function (t) {
        var a = app.findWithRoot(t, ".menu-sticky"),
            e = app.findWithRoot(t, ".menu-sticky__close"),
            i = [],
            n = document.querySelectorAll(".menu-sticky__link");
        n.forEach(function (t) {
            var e = t.getAttribute("href");
            if (e && "#" == e[0]) {
                var a = document.querySelector(e);
                a && i.push(a)
            }
        }), a && (window.addEventListener("scroll", function () {
            var t = i.filter(function (t) {
                return function (t) {
                    var e = t.getBoundingClientRect();
                    return 0 <= e.top && 0 <= e.left && e.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e.right <= (window.innerWidth || document.documentElement.clientWidth)
                }(t)
            });
            if (t.length) {
                var e = t[t.length - 1];
                n.forEach(function (t) {
                    t.classList.remove("active"), t.parentElement.classList.remove("active"), t.getAttribute("href") === "#" + e.id && (t.classList.add("active"), t.parentElement.classList.add("active"))
                })
            }
            450 < scrollY ? a.addClass("show") : a.remove("show")
        }), a.on("click", function () {
            a.addClass("active")
        }), a.on("mouseleave", function () {
            a.removeClass("active")
        }), e.on("click", function (t) {
            t.stopPropagation(), a.removeClass("active")
        }))
    }, app.JQueryInputHooks = function () {
        function d(t, e, a) {
            if ($.expr.match.bool.test(a)) return !1 === e ? jQuery.removeAttr(t, a) : t.setAttribute(a, a), a
        }

        function t(t, e) {
            $(t).trigger("input-hook", [{
                type: "set-value",
                value: e
            }])
        }

        function e(t, e, a) {
            "INPUT" !== t.tagName && "SELECT" !== t.tagName || $(t).trigger("input-hook", [{
                type: "set-attr",
                value: e,
                attr: a
            }])
        }

        function a(t, e, a, i) {
            var n = i ? "set" : "get",
                o = $[t][e] || {},
                r = ($[t][e] = o)[n];
            !r && "attrHooks" === t && i && (r = d), $[t][e][n] = function () {
                var t = arguments;
                return setTimeout(function () {
                    a.apply(this, t)
                }), r ? r.apply(this, arguments) : void 0
            }
        }
        a("valHooks", "input", t, !0), a("valHooks", "select", t, !0), a("valHooks", "textarea", t, !0), a("attrHooks", "disabled", e, !0), a("propHooks", "disabled", e, !0), a("attrHooks", "readonly", e, !0), a("propHooks", "readonly", e, !0), a("attrHooks", "checked", e, !0), a("propHooks", "checked", e, !0)
    }, app.JQueryInputHooks(), $(function () {
        app.dom = {
            $window: $(window),
            $document: $(document),
            $body: $("body"),
            $header: $("#header")
        }, app.l10n = window.appLocalization, app.utils.getDirection.init(), app.init(document, !1), app.dom.$document.on("new-html", function (t) {
            app.init(t.target, !0)
        }), setTimeout(function () {
            app.dom.$document.trigger("app-ready")
        }), -1 !== navigator.appVersion.indexOf("MSIE 10") && setTimeout(function () {
            app.dom.$body.addClass("ie10")
        })
    }), app.init = function (t, e) {
        try {
            app.copyBtn(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.materialsGall(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.bannersGall(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.gotoUp(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeHeaderGall(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.dropdown(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.tabsWidthCheckingUnit(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.tips(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.topLine(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeContentAnimation(t)
        } catch (t) {
            console.error(t)
        }
        try {
            // app.tabs(t)
        } catch (t) {
            console.error(t)
        }
        try {
            // app.homeTabs(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.toggle(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeBannersGall(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.versions(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeMenuButton(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.helpful(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.searchHelpful(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.requestHelpful(t)
        } catch (t) {
            console.error(t)
        }
        try {
            e || app.openAnchor(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.tables(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.imageSlider(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.menuSticky(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.shareBtn(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.ajaxNews(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.ajaxPreviews(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.ajaxAbout(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.ajaxCross(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.rouble(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.calendar(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.orgStructure(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.filters(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.datepicker(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.datepickerPeriod(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.monthpicker(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.monthpickerPeriod(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.yearpickerPeriod(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.menu(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeHeaderGallMobile(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.event(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.sorting(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.tabsWithFilters(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.searchForm(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.textareaCounter(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.textInput(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.fileInput(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.select(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.radioCheckbox(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.addField(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.toggleSelectPopup(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.scrollToContentBtn(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.videoStub(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.accessibility(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.export(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.popupCookies(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.popup(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.trAsLink(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.inputHiddenField(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.newsMainText(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.checkboxAllSelect(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.banknotesPoints(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.brandbook(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.lineCutter(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.mobileTooltip(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeStickyMenu(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.popupOldVersionSite(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeHeaderIEFix(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.homeMainAsideSticky(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.excursionCalendar(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.faqIndicators(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.subscribe(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.statistics(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.AddItemInMenu(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.accordionTable(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.dropDownRow(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.hidingContentTable(t)
        } catch (t) {
            console.error(t)
        }
        try {
            app.clickOnHref(t)
        } catch (t) {
            console.error(t)
        }
        app.findWithRoot(t, ":input").inputmask()
    }, app.copyBtn = function (t) {
        var e = app.findWithRoot(t, ".copy-btn");
        tippy("[data-copy-url]", {
            placement: "bottom-start",
            trigger: "click",
            content: function (t) {
                return t.getAttribute("data-tooltip-content") || t.getAttribute("data-footnote") || t.title
            },
            onShow: function (t) {
                setTimeout(function () {
                    t.hide()
                }, 2e3)
            }
        }), e.on("mouseleave", function (t) {
            $(t.currentTarget).hasClass("active") && t.stopImmediatePropagation()
        }), e.on("mouseout", function (t) {
            $(t.currentTarget).hasClass("active") && t.stopImmediatePropagation()
        }), e.on("click", function (t) {
            t.preventDefault();
            var e = $(this);
            e.trigger("mouseleave").trigger("mouseenter"), e.addClass("active"), setTimeout(function () {
                    e.removeClass("active")
                }, 2e3),
                function (t) {
                    var e = $("<input>");
                    $("body").append(e), e.val(t).select(), document.execCommand("copy"), e.remove()
                }(e.data("copy-url"))
        })
    }, app.statistics = function (t) {
        var e = app.findWithRoot(t, "[data-statistics-filter]");
        e.length && e.each(function () {
            var t = $(this),
                e = t.find("[data-statistics-filter-inner]"),
                a = t.find("[data-statistics-filter-search]"),
                i = t.find("[data-statistics-filter-search-empty]"),
                o = t.find("[data-statistics-filter-theme]").parent(),
                r = o.children("[data-statistics-filter-theme-text]"),
                d = t.find("[data-statistics-filter-theme-group]").parent(),
                s = d.children("[data-statistics-filter-theme-text]"),
                n = t.find("[data-filter-close]"),
                l = t.find("input[type=radio]"),
                c = d.add(o);

            function p() {
                var n = $(this).val().toLowerCase();
                if (c.removeClass("_hidden _found"), !n) return e.css("min-height", ""), void i.hide();
                "auto" === e.css("min-height") && e.css("min-height", e.height() + "px"), r.each(function () {
                    var t = $(this),
                        e = -1 !== t.text().toLowerCase().indexOf(n);
                    t.parent().addClass(e ? "_found" : "_hidden")
                }), s.each(function () {
                    var t = $(this),
                        e = t.parent(),
                        a = -1 !== t.text().toLowerCase().indexOf(n);

                    function i() {
                        var t = e.children("[data-toggle-btn]");
                        t.hasClass("_active") || t.click()
                    }
                    e.parents(d).add(e.find(o)).hasClass("_found") ? i() : a ? (e.addClass("_found").find(c).removeClass("_hidden"), i()) : e.addClass("_hidden")
                }), i.toggle(!c.hasClass("_found"))
            }
            n.on("click", function () {
                a.val() && a.val("")
            }), l.on("change", function () {
                a.val() && a.val("")
            }), a.on("input", p), a.on("input-hook", p)
        })
    }, app.subscribe = function (t) {
        var e = app.findWithRoot(t, "[data-subscribe]");
        e.length && e.each(function () {
            var t = $(this),
                i = t.find("input[type=checkbox]"),
                n = t.find("[data-subscribe-selected]"),
                e = t.find("[data-subscribe-popup-open]"),
                a = $('[data-subscribe-popup="' + t.data("subscribe") + '"]'),
                o = a.find("[data-subscribe-popup-inner]"),
                r = a.find("[data-subscribe-popup-close]"),
                d = a.find("[data-subscribe-popup-clear]"),
                s = a.find("[data-subscribe-popup-search]"),
                l = a.find("[data-subscribe-popup-search-empty]"),
                c = a.find("[data-subscribe-popup-theme]"),
                p = c.parent(),
                f = p.children("[data-subscribe-popup-theme-text]"),
                h = a.find("[data-subscribe-popup-theme-group]"),
                u = h.parent(),
                g = u.children("[data-subscribe-popup-theme-text]");
            i.on("change", function () {
                c.prop("checked", i.is(":checked"))
            }), i.is(":checked") && 0 === c.filter(":checked").length && c.prop("checked", !0), e.on("click", function () {
                a.addClass("_open"), a.focus()
            }), r.on("click", function () {
                a.removeClass("_open"), s.val("")
            }), d.on("click", function () {
                c.prop("checked", !1)
            });
            var m = u.add(p);

            function v() {
                var i = $(this).val().toLowerCase();
                if (m.removeClass("_hidden _found"), !i) return o.css("min-height", ""), void l.hide();
                "auto" === o.css("min-height") && o.css("min-height", o.height() + "px"), f.each(function () {
                    var t = $(this),
                        e = -1 !== t.text().toLowerCase().indexOf(i);
                    t.parent().addClass(e ? "_found" : "_hidden")
                }), g.each(function () {
                    var t = $(this),
                        e = t.parent(),
                        a = -1 !== t.text().toLowerCase().indexOf(i);
                    e.parents(u).add(e.find(p)).hasClass("_found") || (a ? e.addClass("_found").find(m).removeClass("_hidden") : e.addClass("_hidden"))
                }), l.toggle(!m.hasClass("_found"))
            }
            s.on("input", v), s.on("input-hook", v), h.each(function () {
                var a = $(this),
                    i = a.parent();
                a.is(":checked") && i.find(c).filter(":not(:checked)").prop("checked", !0), a.on("change", function (t) {
                    i.find(c).prop("checked", a.is(":checked"))
                });
                var e = app.createRunOnceTimeout();

                function t(t) {
                    t && a.is(t.target) || e(function () {
                        var t = i.find(c),
                            e = t.filter(":checked");
                        i.removeClass("_indeterminate"), t.length === e.length ? a.prop("checked", !0) : 0 !== e.length ? (a.prop("checked", !1), i.addClass("_indeterminate")) : a.prop("checked", !1)
                    })
                }
                t(), i.on("change", t), i.on("input-hook", t)
            });
            var _ = app.createRunOnceTimeout();

            function b() {
                _(function () {
                    var t = c.add(h),
                        e = t.filter(":checked");
                    if (e.length === t.length) i.prop("checked", !0), n.removeClass("_active").text("");
                    else if (0 < e.length) {
                        i.prop("checked", !0);
                        var a = (app.declOfNum(e.length, app.l10n.subscription.text) || "").replace("$count$", e.length);
                        n.addClass("_active").text(a)
                    } else i.prop("checked", !1)
                })
            }
            b(), a.on("change", function (t) {
                "checkbox" === t.target.type && b()
            }), a.on("input-hook", b)
        })
    }, app.faqIndicators = function (t) {
        var d = "data-faq-indicator",
            e = "data-faq-indicator-filter",
            a = app.findWithRoot(t, "[" + d + "]"),
            i = app.findWithRoot(t, "[" + e + "]");
        if (a.length || i.length) {
            var n = a.filter("[" + d + "=new-update]"),
                o = a.filter("[" + d + "=new]").add(n),
                r = a.filter("[" + d + "=update]").add(n);
            a.filter(".dropdown_link").each(function () {
                var t = $(this),
                    e = t.closest("[" + d + "]").attr(d),
                    a = $('<span class="faq-indicator-' + e + '" />'),
                    i = this.childNodes[this.childNodes.length - 1];
                i && 3 === i.nodeType && i.data && 0 < i.data.trim().length && t.append(a)
            }), a.filter(".dropdown.question").children(".dropdown_title").children(".question_title").each(function () {
                var t = $(this),
                    e = t.closest("[" + d + "]").attr(d),
                    a = $('<span class="faq-indicator-' + e + '" />'),
                    i = this.childNodes[this.childNodes.length - 1];
                i && 3 === i.nodeType && i.data && 0 < i.data.trim().length && t.append(a);
                var n = t.children("p:last-child"),
                    o = t.children("h2:last-child, h3:last-child, h4:last-child"),
                    r = t.children("ul:last-child, ol:last-child");
                n.length ? n.append(a) : r.length ? r.find("li:last-child h3").append(a) : o.length ? 0 < o.children("p").length ? o.find("p:last-child").append(a) : o.append(a) : t.append(a)
            });
            var s = i.filter(function () {
                return 0 < $(this).find("input:checked").length
            });
            s[0] && l.call(s[0]), i.on("change", l)
        }

        function l() {
            switch ($(this).attr(e)) {
                case "new":
                    a.hide(), o.show();
                    break;
                case "update":
                    a.hide(), r.show();
                    break;
                default:
                    a.show()
            }
        }
    }, app.excursionCalendar = function (t) {
        var n = "data-excursion-calendar-type",
            o = app.findWithRoot(t, "[" + n + "]"),
            e = app.findWithRoot(t, "[data-excursion-calendar-head]"),
            r = app.findWithRoot(t, "[data-excursion-calendar]"),
            a = app.findWithRoot(t, "[data-excursion-calendar-text]"),
            d = app.findWithRoot(t, ".news-events-empty"),
            s = d.find("[data-excursion-empty-description]"),
            i = d.find("[data-excursion-empty-reset-button]");
        if (o.length) {
            var l = r.find(".excursion-calendar_col"),
                c = l.children(),
                p = e.children();
            if (!p.filter("._active").length) {
                var f = p.filter(":not(._disabled)").eq(0).index();
                p.add(l).removeClass("_active"), p.eq(f).add(l.eq(f)).addClass("_active")
            }
            p.each(function (t) {
                var e = $(this);
                e.hasClass("_disabled") || e.on("click", function () {
                    p.add(l).removeClass("_active"), e.add(l.eq(t)).addClass("_active"), e.closest(".excursion-calendar_table_empty").find("#text").toggle()
                })
            }), o.on("click", function (t) {
                var e = $(t.target),
                    a = e.attr(n);
                o.removeClass("_active"), e.addClass("_active"), r.removeClass("_group _personal"), a && r.addClass("_" + a);
                var i = c.filter("._" + a);
                a && !i.length ? (d.addClass("_active _with-filter"), s.text("По вашему запросу ничего не найдено.")) : (a || c.length ? d.removeClass("_active _with-filter") : (d.addClass("_active"), d.removeClass("_with-filter")), s.text("К сожалению, на этой неделе экскурсий пока не запланировано."))
            }), i.on("click", function (t) {
                o.first().trigger("click")
            }), u();
            var h = Date.now();
            app.dom.$window.on("resize", function () {
                Date.now() - h <= 200 || (setTimeout(u, 200), h = Date.now())
            })
        }

        function u() {
            a.each(function () {
                var t = $(this),
                    e = t.data("text");
                if (e || (e = t.text(), t.data("text", e)), t.text() !== e && t.text(e), !(Math.round(t.height()) + 1 >= this.scrollHeight))
                    for (var a = e.split(" "); a.pop();)
                        if (t.text(a.join(" ") + "…"), Math.round(t.height()) + 1 >= this.scrollHeight) return
            })
        }
    }, app.homeHeaderIEFix = function (t) {
        var e = app.findWithRoot(t, ".home-header_bottom"),
            a = !!window.MSInputMethodContext && !!document.documentMode;
        if (e.length && a) {
            var i = $('<div class="home-header_bottom-compensation" />').appendTo(e.parent());
            e.addClass("_ie-fix"), n(), app.dom.$window.on("resize", n)
        }

        function n() {
            setTimeout(function () {
                i.css("height", e.height() + "px")
            })
        }
    }, app.homeMainAsideSticky = function (t) {
        var g = app.findWithRoot(t, "[data-home-main-aside-sticky]");
        if (g.length) {
            var m, v = app.dom.$window,
                _ = g.parent(),
                b = "_start",
                k = document.body.offsetHeight;
            w(), setTimeout(function () {
                window.addEventListener("scroll", e)
            }, 500), app.dom.$window.on("resize", function () {
                w(), e()
            }), app.dom.$window.on("new-html", function () {
                setTimeout(e)
            })
        }

        function w() {
            _.css("min-height", g.outerHeight() + "px")
        }

        function e(t) {
            var e = v.scrollTop();
            if (!(e === m && t && "scroll" === t.type || Math.round(g.outerHeight()) >= Math.round(_.height()))) {
                var a, i = _.get(0).getBoundingClientRect(),
                    n = e + i.top,
                    o = e + i.bottom,
                    r = g.height(),
                    d = g.get(0).getBoundingClientRect(),
                    s = e + d.top,
                    l = e + d.bottom,
                    c = e,
                    p = e + v.height(),
                    f = e - m,
                    h = f < 0,
                    u = 0 < f;
                if (s < n && h) a = "_start";
                else if (c < s && "_start" !== b && h) a = "_fixedTop";
                else if (o < l) a = "_end", g.css("top", "auto"), setTimeout(function () {
                    var t = v.scrollTop(),
                        e = t + _.get(0).getBoundingClientRect().top,
                        a = t + g.get(0).getBoundingClientRect().top;
                    g.css("top", a - e)
                }, 800);
                else if (l < p && r < c && "_end" !== b && u) a = "_fixedBottom";
                else if (h && "_fixedBottom" === b || u && "_fixedTop" === b) g.css("top", s - n - f);
                else {
                    a = b
                }
                _.css("min-height") !== g.outerHeight() + "px" && w(), 1 < document.body.offsetHeight - k && "_end" == b && (g.removeClass("_fixedTop _fixedBottom _start _end"), g.addClass("_fixedTop"), a = "_fixedTop", k = document.body.offsetHeight), a && a !== b && (b = a, g.removeClass("_fixedTop _fixedBottom _start _end"), a && g.addClass(a)), m = e
            }
        }
    }, app.popupOldVersionSite = function (t) {
        var e = app.findWithRoot(t, "[data-old-site-version]"),
            a = e.find("[data-old-site-version-close]");
        if (e.length) {
            var i = "old-version-site";
            !!document.cookie.match(new RegExp("(?:^|; )" + i + "=([^;]*)")) || (e.show(), a.on("click", function () {
                document.cookie = i + "=1; path=/; max-age=31536000", e.hide()
            }))
        }
    }, app.homeStickyMenu = function (t) {
        var e = app.findWithRoot(t, "[data-home-sticky]"),
            a = e.parent(),
            i = app.findWithRoot(t, ".top-line"),
            n = $(".tab_selected"),
            o = app.findWithRoot(t, ".tabs_items");
        if (e.length) {
            function r() {
                if (!a.length) return !1;
                n.hasClass("_active") && (n.removeClass("_active"), o.hide());
                var t = a[0].getBoundingClientRect();
                t.top > i.height() || t.bottom < e.outerHeight() ? e.hasClass("_fixed") && e.removeClass("_fixed").width("") : t.top <= 0 && !e.hasClass("_fixed") && e.addClass("_fixed").width(t.width)
            }
            r(), a.find("a").on("click", function (t) {
                var e = a.offset();
                $("html, body").stop().animate({
                    scrollTop: e.top - i.height()
                }, 300, "swing")
            }), app.dom.$window.on("scroll", r), app.dom.$window.on("resize", function () {
                e.hasClass("_fixed") && e.width(a.width())
            })
        }
    }, app.mobileTooltip = function () {
        var e = $('<div class="mobile-tooltip" />').hide(),
            a = $("<div />").appendTo(e);
        return $('<div class="mobile-tooltip_close" />').on("click", function () {
                e.hide(), a.html("")
            }).appendTo(e),
            function (t) {
                e.appendTo(app.dom.$body), app.findWithRoot(t, "[data-mobile-tooltip-content]").on("click", function () {
                    a.html($(this).data("mobile-tooltip-content")), e.show()
                })
            }
    }(), app.lineCutter = function (t) {
        app.findWithRoot(t, "[data-line-cutter]").each(function () {
            var t = $(this),
                e = +t.data("line-cutter");

            function a() {
                setTimeout(function () {
                    t.line(e, "...")
                })
            }
            e && (setTimeout(a), setTimeout(a, 500), app.dom.$window.on("resize", a))
        })
    }, app.brandbook = function (t) {
        var e = app.findWithRoot(t, "[data-brandbook]");
        if (e.length) {
            var a = app.findWithRoot(t, "[data-brandbook-variant]");
            a.on("click", function () {
                var t = $(this);
                t.siblings().removeClass("_active"), t.addClass("_active"), i()
            }), i()
        }

        function i() {
            var t = a.filter("._active").map(function () {
                return "brandbook-" + $(this).data("brandbook-variant")
            }).get().join(" ");
            e.attr("class", "brandbook").addClass(t)
        }
    }, app.banknotesPoints = function (t) {
        app.findWithRoot(t, "[data-point-container]").each(function () {
            var a = $(this).find("[data-point]"),
                l = a.length,
                i = null,
                n = null;

            function c(t) {
                a.eq(t).removeClass("_active"), app.dom.$document.off("click", n), i = null
            }

            function p(e) {
                if (i !== e) {
                    null !== i && c(i);
                    var o = a.eq(e);
                    i = e, o.addClass("_active"), n = function (t) {
                        $(t.target).closest(o).length || c(e)
                    }, app.dom.$document.on("click", n), setTimeout(function () {
                        var t = o.find("[data-point-info]"),
                            e = app.dom.$window.scrollTop(),
                            a = app.dom.$window.height(),
                            i = t.offset().top - e,
                            n = i + t.outerHeight();
                        i < 0 ? $("html, body").stop().animate({
                            scrollTop: e + i - a / 2
                        }, 300, "swing") : a < n && $("html, body").stop().animate({
                            scrollTop: e + n - a / 2
                        }, 300, "swing")
                    })
                }
            }
            a.each(function (t) {
                var a = $(this),
                    e = a.find("[data-point-open]"),
                    i = a.find("[data-point-close]"),
                    n = a.find("[data-point-info]"),
                    o = a.find("[data-point-counter]"),
                    r = a.find("[data-point-prev]"),
                    d = a.find("[data-point-next]");

                function s() {
                    var t = a.offset().left + a.outerWidth() / 2,
                        e = app.dom.$window.width();
                    n.removeClass("_left _right _top"), 888 < t ? n.addClass("_left") : 800 < e - t ? n.addClass("_right") : n.addClass("_top")
                }
                s(), a.closest("[data-tabs-content]").on("show-hidden", s), app.dom.$window.on("resize", s), o.text(t + 1 + " / " + l), r.on("click", function () {
                    return p(0 === t ? l - 1 : t - 1), !1
                }), d.on("click", function () {
                    return p(t === l - 1 ? 0 : t + 1), !1
                }), e.on("click", function () {
                    p(t)
                }), i.on("click", function () {
                    c(t)
                })
            })
        })
    }, app.checkboxAllSelect = function (t) {
        var l = "data-select-all";
        app.findWithRoot(t, "[" + l + "]:not(:checkbox)").each(function () {
            var t = $(this),
                e = t.attr(l),
                a = e ? t.parent().parent() : t.parent(),
                i = t.children(":eq(0)"),
                n = t.children(":eq(1)"),
                o = !0,
                r = (e ? "[" + l + '="' + e + '"]' : "") + ":checkbox:enabled";

            function d() {
                return a.find(r)
            }

            function s() {
                var t = d();
                o = t.length !== t.filter(":checked").length, 0 < t.filter(":checked").length ? $(n).attr("disabled", !1) : $(n).attr("disabled", !0), n.hasClass("btn") || i.hasClass("btn") ? n.hasClass("btn") && i.hasClass("btn") && (i.show(), n.show()) : (i.toggle(o), n.toggle(!o))
            }
            t.on("click", function (t) {
                $(t.target).hasClass("btn") && $(t.target).is(i) ? d().prop("checked", !0) : $(t.target).hasClass("btn") && $(t.target).is(n) ? (d().prop("checked", !1), $(n).attr("disabled", !0)) : d().prop("checked", o)
            }), a.on("change input-hook", function (t, e) {
                $(t.target).is(":checkbox") && (e && "set-attr" !== e.type || s())
            }), s()
        })
    }, app.newsMainText = function (t) {
        var n = app.findWithRoot(t, "[data-news-main-container]"),
            o = n.find("[data-news-main-text]");
        if (n.length && o.length) {
            var r = o.html();
            a();
            var e = i();
            app.dom.$window.on("resize", function () {
                i() - e <= 200 || (setTimeout(a, 200), e = i())
            })
        }

        function a() {
            o.css({
                display: "none",
                height: "",
                margin: ""
            });
            var t = n.height(),
                e = r.split(/<br *\/?>/).map(function (t) {
                    return t ? t.split(" ") : []
                });
            if (o.html(".").css({
                    display: "block",
                    visibality: "hidden"
                }), n.height() > t) return o.html(r), void o.css({
                display: "block",
                height: "0",
                margin: "0"
            });
            o.html(r);
            t: for (var a = e.length - 1; 0 <= a; a--) {
                for (var i = !1; e[a].length;) {
                    if (n.height() <= t) break t;
                    o.html(e.map(function (t) {
                        return t.join(" ")
                    }).join("<br>") + (i ? "..." : "")), i = !0, e[a].pop()
                }
                e.pop()
            }
            o.css({
                visibality: ""
            })
        }

        function i() {
            return "undefined" != typeof performance && performance.now ? performance.now() : Date.now()
        }
    }, app.inputHiddenField = function (t) {
        app.findWithRoot(t, "[data-input-hidden-id]").each(function () {
            var e = $(this),
                t = e.data("input-hidden-id"),
                a = $("#" + t),
                i = e.is("option");

            function n(t) {
                a.toggle(i ? e.closest("select").val() === e.attr("value") : e.is(":checked"))
            }
            var o = i ? e.closest("select") : e.closest("form").find('input[type="' + e.attr("type") + '"][name="' + e.attr("name") + '"]');
            o.on("change", n), o.on("input-hook", n), n()
        })
    }, app.popupCookies = function (t) {
        var e = app.findWithRoot(t, "[data-popup-cookies]"),
            a = e.find("[data-popup-cookies-btn]");
        if (e.length) {
            !!document.cookie.match(new RegExp("(?:^|; )accept=([^;]*)")) || (e.addClass("_open"), a.on("click", function () {
                document.cookie = "accept=1; path=/; max-age=31536000", e.removeClass("_open")
            }))
        }
    }, app.popup = function (t) {
        var e = app.findWithRoot(t, "[data-popup-open]"),
            a = app.findWithRoot(t, "[data-popup-close]");
        e.on("click", function (t) {
            var e = $(this).attr("data-popup-open"),
                a = $('[data-popup="' + e + '"]');
            a.data("body-overflow", document.body.style.overflow), document.body.style.overflow = "hidden", a.addClass("_open");
            var i = a.find("input");
            i.length ? i.first().focus() : a.attr("tabindex", "-1").focus(), t.preventDefault()
        }), a.on("click", function (t) {
            var e = $(this).closest("[data-popup]");
            document.body.style.overflow = e.data("body-overflow") || "", e.removeClass("_open"), t.preventDefault()
        })
    }, app.accessibility = function (t) {
        app.findWithRoot(t, ".footer_menu_item._visually-impaired a").on("click", function () {
            return $("html").toggleClass("vision-impaired"), app.dom.$window.trigger("resize"), window.localStorage && localStorage.setItem("vision-impaired", !!$("html").hasClass("vision-impaired") || ""), !1
        })
    }, app.trAsLink = function (t) {
        app.findWithRoot(t, "tr[data-tr-link]").on("click", function (t) {
            var e = $(this).attr("data-tr-link");
            e && (window.location = e)
        })
    }, app.videoStub = function (t) {
        if ($('meta[name="cbr:intranet"][content="true"]').length) {
            var e = app.findWithRoot(t, ".media > .video-scale");
            e.children().remove(), $('<div class="video-stub"><div class="video-stub__img-no-video"></div><span>Данное видео доступно <br>только в сети интернет</span></div>').appendTo(e)
        }
    }, app.scrollToContentBtn = function (t) {
        app.findWithRoot(t, "[data-scroll-to-content]").on("click", function () {
            $("html, body").stop().animate({
                scrollTop: app.dom.$window.height()
            }, 300, "swing")
        })
    }, app.fileInput = function (t) {
        app.findWithRoot(t, "[data-file-input], [data-file-input-simple]").each(function () {
            var i = $(this),
                r = i.find(".file-input_files"),
                n = i.find('input[type="file"]'),
                t = i.find(".file-input_input"),
                e = i.find(".file-input_delete-all"),
                d = i.is("[data-file-input-simple]"),
                s = n.data("fileextensions"),
                l = +n.data("maxfilenamesize"),
                o = +n.data("maxfilescount"),
                c = +n.data("maxfilesize");

            function a() {
                var e = 0,
                    a = 0;
                if (i.find(".file-input_file").each(function () {
                        var t = $(this).data("file");
                        e += t.size, a++
                    }), i.toggleClass("_delete-all", d ? 1 <= a : 2 <= a), !d) {
                    var t = "";
                    c < e ? t = app.l10n.file.maxSizeErr : o < a && (t = app.l10n.file.maxCountErr), i.toggleClass("_error", !!t), i.find(".file-input_error-name").html(t)
                }
            }

            function p(t) {
                d && r.empty(), Array.prototype.map.call(t || [], function (t) {
                    var e = (t.name.match(/\.[^.]+?$/) || [""])[0],
                        a = t.name.slice(0, -e.length),
                        i = e.slice(1).toUpperCase(),
                        n = function (t) {
                            return t ? 10485760 <= t ? Math.round(t / 1048576) + " " + app.l10n.file.mb : 1048576 <= t ? (t / 1048576).toFixed(1).replace(".", ",") + " " + app.l10n.file.mb : 10240 <= t ? Math.round(t / 1024) + " " + app.l10n.file.kb : 1024 <= t ? (t / 1024).toFixed(1).replace(".", ",") + " " + app.l10n.file.kb : t + " " + app.l10n.file.b : ""
                        }(t.size);
                    if (!d) try {
                        var o = !1;
                        s.indexOf(i) < 0 ? o = app.l10n.file.formatErr : t.name.length > l && (o = app.l10n.file.nameSizeErr.replace("$value$", l))
                    } catch (t) {}
                    $('<div class="file-input_file' + (o ? " _error" : "") + '">  <div class="file-input_name"><span>' + a + "</span><span>" + e + '</span></div>  <div class="file-input_info">' + n + (d ? "" : '<button class="file-input_delete" type="button" aria-label="Удалить"></button>') + "  </div>" + (o ? '<div class="file-input_additional">' + o + "</div>" : "") + "</div>").data("file", t).appendTo(r)
                }), a()
            }
            t.on("dragover", function () {
                return $(this).addClass("_dragging"), !1
            }), t.on("dragleave", function () {
                return $(this).removeClass("_dragging"), !1
            }), t.on("drop", function (t) {
                $(this).removeClass("_dragging");
                var e = t.originalEvent.dataTransfer.files;
                if (d) try {
                    if (n.is("[multiple]") || 1 === e.length) n.get(0).files = e;
                    else {
                        var a = new DataTransfer;
                        a.items.add(e[0]), n.get(0).files = a.files
                    }
                    p(n.get(0).files)
                } catch (t) {} else p(e);
                return !1
            }), n.on("change", function () {
                p(n.get(0).files), d || n.prop("value", null)
            }), i.on("click", ".file-input_delete", function () {
                $(this).closest(".file-input_file").remove(), a()
            }), e.on("click", function () {
                i.find(".file-input_file").remove(), d && n.prop("value", null), a()
            })
        })
    }, app.textInput = function (t) {
        app.findWithRoot(t, "[data-text-input]").each(function () {
            var e = $(this),
                a = e.find("input"),
                t = e.find(".input_label"),
                i = $('<button class="text-input_clear" tabindex="-1" type="button" aria-label="Очистить" />').appendTo(t);
            if (e.is("._filter")) {
                var n = e.find(".input_label"),
                    o = e.find(".input_placeholder"),
                    r = e.find(".datepicker-filter"),
                    d = e.find(".datepicker-filter_button"),
                    s = e.find(".datepicker-filter_datepicker, .datepicker-filter_datepicker-from, .datepicker-filter_datepicker-to"),
                    l = e.find(":input");

                function c() {
                    var t = !0;
                    a.each(function () {
                        t = t && !!$(this).val()
                    }), e.toggleClass("_value", t)
                }

                function p() {
                    e.toggleClass("_focus", r.is("._open"))
                }

                function f() {
                    e.toggleClass("_disabled", !!l.attr("disabled")), e.toggleClass("_readonly", !!l.attr("readonly"))
                }
                n.on("click", function (t) {
                    d.attr("disabled") || ((n.is(t.target) || o.is(t.target)) && setTimeout(function () {
                        d.trigger("click")
                    }), t.preventDefault())
                }), r.on("click", function () {
                    setTimeout(p)
                });
                try {
                    s.each(function () {
                        this.addEventListener("click", function () {
                            setTimeout(p), setTimeout(c)
                        }, !0)
                    })
                } catch (t) {
                    console.error(t), s.on("click", function () {
                        c(), p()
                    })
                }
                i.on("click", function () {
                    r.trigger("filter-clear"), c(), p()
                }), app.dom.$document.on("click", function () {
                    setTimeout(p)
                }), setTimeout(function () {
                    f(), c()
                }), e.on("input-hook", function (t, e) {
                    c(), f(), p()
                })
            } else {
                function h() {
                    e.toggleClass("_value", !!a.val()), e.toggleClass("_disabled", !!a.attr("disabled")), e.toggleClass("_readonly", !!a.attr("readonly"))
                }
                a.on("focus blur", function (t) {
                    e.toggleClass("_focus", "focus" === t.type)
                }), a.on("input", function () {
                    e.toggleClass("_value", !!a.val())
                }), a.on("change", function () {
                    a.trigger("filter-select")
                }), a.on("input-hook", h), i.on("click", function () {
                    a.val(""), a.trigger("input"), a.trigger("change"), a.trigger("focus")
                }), h()
            }
        })
    }, app.select = function (t) {
        app.findWithRoot(t, "[data-select]").each(function () {
            var e = $(this),
                t = e.find("select");

            function a() {
                e.toggleClass("_value", !!t.val()), e.toggleClass("_disabled", t.is(":disabled"))
            }
            t.on("focus blur", function (t) {
                e.toggleClass("_focus", "focus" === t.type)
            }), e.toggleClass("_value", !!t.val()), t.on("change", function () {
                e.toggleClass("_value", !!t.val()), t.trigger("filter-select")
            }), t.on("input-hook", a), a()
        })
    }, app.radioCheckbox = function (t) {
        app.findWithRoot(t, '.radio input[type="radio"], .checkbox input[type="checkbox"]').on("change", function () {
            $(this).trigger("filter-select")
        })
    }, app.sorting = function (t) {
        var a = app.findWithRoot(t, "[data-sorting]");
        a.length && (a.each(function () {
            var t = $(this),
                e = t.find("[data-sorting-title]"),
                a = t.find("[data-sorting-close"),
                i = t.find("[data-sorting-direction]"),
                n = i.find("input"),
                o = t.find("[data-sorting-items]"),
                r = o.find("input"),
                d = "";

            function s() {
                d = r.filter(":checked").siblings("label").text(), e.text(d), o.hide()
            }

            function l() {
                var t = n.val();
                "down" === t && "up" === t || n.prop("value", "down"), "up" !== t ? i.removeClass("_active") : i.addClass("_active")
            }
            e.on("click", function () {
                o.toggle()
            }), r.filter(":checked").length || r.first().prop("checked", !0), r.on("change", s), r.on("input-hook", function (t, e) {
                "set-attr" === e.type && "checked" === e.attr && s()
            }), s(), a.on("click", function () {
                o.hide()
            }), l(), n.on("input-hook", function (t, e) {
                "set-value" === e.type && l()
            }), i.on("click", function () {
                var t = $(this),
                    e = t.hasClass("_active") ? "down" : "up";
                n.prop("value", e), t.toggleClass("_active")
            })
        }), app.dom.$document.click(function (e) {
            a.each(function () {
                var t = $(this);
                $(e.target).closest(t).length || t.find("[data-sorting-items]").hide()
            })
        }))
    }, app.event = function (t) {
        var e = app.findWithRoot(t, ".event_application"),
            a = e.parent().parent().parent();
        e.length && $(window).on("scroll", function () {
            if (e.is(":visible")) {
                var t = e.hasClass("_fixed");
                a.get(0).getBoundingClientRect().bottom + e.height() * t < app.dom.$window.height() ? t && e.removeClass("_fixed") : t || e.addClass("_fixed")
            }
        })
    }, app.monthpicker = function (t) {
        app.findWithRoot(t, "[data-monthpicker-filter], [data-quarterpicker-filter]").each(function () {
            var o = $(this),
                r = o.find(".datepicker-filter_button"),
                d = o.find(".datepicker-filter_close"),
                t = o.find(".datepicker-filter_clear-btn"),
                s = o.find(".datepicker-filter_input"),
                l = o.find(".datepicker-filter_datepicker"),
                a = o.is("[data-quarterpicker-filter]"),
                c = a ? "QuarterPicker" : "MonthPicker",
                i = a ? app.l10n[c].plugin.quarters : app.l10n[c].plugin.months.map(function (t) {
                    return t[0].toLowerCase() + t.slice(1)
                });

            function e(t) {
                $.contains(o.get(0), t.target) || (o.removeClass("_open"), app.dom.$document.off("click", e), s.val() || o.trigger("clear-datepicker"))
            }

            function p(t) {
                if (t && (6 === (t = String(t)).length && (t = "0" + t), /^\d\d(.|\/)\d\d\d\d$/.test(t))) {
                    var e = new Date;
                    return e.setFullYear(+t.slice(-4), +t.slice(0, 2) - 1, 1), e
                }
            }

            function f(t, e, a) {
                return a = a || i[t.getMonth()] + " " + t.getFullYear(), e && (a = e.replace("$$date$$", a)), a[0].toUpperCase() + a.slice(1)
            }

            function h(t) {
                var e = t.getMonth() + 1 + app.l10n[c].separator + t.getFullYear();
                return 6 !== e.length || a || (e = "0" + e), e
            }
            var u = o.data("date-text"),
                n = s.val(),
                g = p(s.val()),
                m = o.data("default-value") || n;

            function v() {
                s.prop("value", ""), l.addClass("_empty"), o.addClass("_empty").removeClass("_changed _modified _open"), r.html(app.l10n[c].emptyValue), app.dom.$document.off("click", e), o.trigger("clear-datepicker"), setTimeout(function () {
                    o.trigger("filter-select")
                })
            }
            "number" == typeof m && (m = String(m)), m && o.toggleClass("_modified", n !== m), g ? r.html(f(g, u)) : (r.html(app.l10n[c].emptyValue), o.addClass("_empty")), l[c]({
                i18n: app.l10n[c].plugin,
                Animation: "none",
                MinMonth: p(o.data("min-date")),
                MaxMonth: p(o.data("max-date")),
                SelectedMonth: g,
                MonthFormat: "mm" + app.l10n[c].separator + "yy",
                OnAfterChooseMonth: function (t) {
                    var e = h(t);
                    s.prop("value", e), s.trigger("input-hook", [{
                        type: "set-value",
                        value: e
                    }, !0])
                }
            }), s.on("input-hook", function (t, e, a) {
                if ("set-value" === e.type) {
                    var i = p(e.value),
                        n = h(i);
                    r.html(f(i, u)).removeClass("_empty"), o.removeClass("_open _empty").toggleClass("_modified", m !== n), a ? s.trigger("filter-select") : l[c]("option", {
                        SelectedMonth: i
                    })
                } else "set-attr" !== e.type || "disabled" !== e.attr && "readonly" !== e.attr || (o.hasClass("_open") && d.trigger("click"), r.attr("disabled", e.value))
            }), l.on("click", function (t) {
                return t.stopPropagation(), !1
            }), s.data("datepickerElement", l), t.on("click", v), o.on("filter-clear", v), r.attr("disabled", !!s.is(":disabled")), r.add(d).on("click", function () {
                o.toggleClass("_open"), o.hasClass("_open") ? (app.dom.$document.off("click", e), app.dom.$document.on("click", e), o.offset().left + o.width() / 2 > app.dom.$window.width() / 2 ? o.addClass("_right") : o.removeClass("_right")) : s.val() || o.trigger("clear-datepicker")
            })
        })
    }, app.monthpickerPeriod = function (t) {
        app.findWithRoot(t, "[data-monthpicker-period-filter], [data-quarterpicker-period-filter]").each(function () {
            var d, s, l, c, p = $(this),
                f = p.find(".datepicker-filter_button"),
                h = p.find(".datepicker-filter_close"),
                u = p.find(".datepicker-filter_apply-btn"),
                t = p.find(".datepicker-filter_clear-btn"),
                e = p.find(".datepicker-filter_modal"),
                i = p.find(".datepicker-filter_tab-from"),
                n = p.find(".datepicker-filter_tab-to"),
                g = p.find(".datepicker-filter_input-from"),
                m = p.find(".datepicker-filter_input-to"),
                a = p.find(".datepicker-filter_datepicker-from"),
                o = p.find(".datepicker-filter_datepicker-to"),
                r = p.is("[data-quarterpicker-period-filter]"),
                v = r ? "QuarterPicker" : "MonthPicker",
                _ = app.l10n[v].plugin[r ? "quarters" : "months"],
                b = p.data("date-text"),
                k = function (t) {
                    return t
                };

            function w(t) {
                $.contains(p.get(0), t.target) || (p.removeClass("_open"), app.dom.$document.off("click", w), d && s ? p.hasClass("_changed") && p.trigger("filter-select") : R())
            }
            b && (k = function (t) {
                return b.replace("$$date$$", t)
            });
            var C = function (t) {
                    if (t && (6 === (t = String(t)).length && (t = "0" + t), /^\d\d(.|\/)\d\d\d\d$/.test(t))) {
                        t = String(t);
                        var e = new Date;
                        return e.setFullYear(+t.slice(-4), +t.slice(0, 2) - 1, 1), e
                    }
                },
                y = function (t) {
                    return t ? _[t.getMonth()] + " " + t.getFullYear() : "<span>" + app.l10n[v].emptyValue + "</span>"
                };

            function x(t) {
                var e = t.getMonth() + 1 + app.l10n[v].separator + t.getFullYear();
                return 6 !== e.length || r || (e = "0" + e), e
            }

            function W() {
                var t = y(d),
                    e = y(s),
                    a = d || s ? " - " : "<span> - </span>";
                i.html(t), n.html(e), f.html(k(t + a + e))
            }

            function R(t) {
                d = s = void 0, g.add(m).prop("value", ""), W(), p.removeClass("_changed _modified _open"), a.add(o).addClass("_empty"), a[v]("option", "MaxMonth", o[v]("option", "MaxMonth")), o[v]("option", "MinMonth", a[v]("option", "MinMonth")), a.add(o)[v]("Update"), app.dom.$document.off("click", w), p.trigger("clear-datepicker"), t && setTimeout(function () {
                    p.trigger("filter-select")
                })
            }

            function T() {
                if (p.hasClass("_open"))
                    if (p.offset().left + 2 * p.outerWidth() / 3 > 2 * app.dom.$window.width() / 3) {
                        if ("left" === e.data("pos")) return;
                        e.data("pos", "left"), e.css("transform", "translateX(" + (-e.outerWidth() + f.outerWidth()) + "px)")
                    } else if (p.offset().left + p.outerWidth() / 3 > app.dom.$window.width() / 3) {
                    if ("center" === e.data("pos")) return;
                    e.data("pos", "center"), e.css("transform", "translateX(" + (-e.outerWidth() + f.outerWidth()) / 2 + "px)")
                } else {
                    if ("right" === e.data("pos")) return;
                    e.data("pos", "right"), e.css("transform", "")
                }
            }

            function S(n, o, a, r) {
                p.data("date-text");
                var t = C(a.val());
                if (t) {
                    var e = a.val();
                    r ? l = p.data("default-value-from") || e : c = p.data("default-value-to") || e, r ? d = t : s = t, o[v]("option", r ? "MinMonth" : "MaxMonth", t)
                } else u.attr("disabled", !0);
                n[v]("option", {
                    i18n: app.l10n[v].plugin,
                    Animation: "none",
                    MinMonth: C(p.data("min-date")) || null,
                    MaxMonth: C(p.data("max-date")) || null,
                    SelectedMonth: t,
                    MonthFormat: "mm" + app.l10n[v].separator + "yy",
                    OnAfterChooseMonth: function (t) {
                        var e = x(t);
                        a.val() !== e && (a.prop("value", e), a.trigger("input-hook", [{
                            type: "set-value",
                            value: e
                        }, !0]))
                    }
                }), a.on("input-hook", function (t, e, a) {
                    if ("set-value" === e.type) {
                        var i = C(e.value);
                        x(i);
                        r ? d = i : s = i, W(), T(), p.addClass("_tab-to _changed").toggleClass("_modified", l !== g.val() || c !== m.val()), n.removeClass("_empty"), o[v]("option", r ? "MinMonth" : "MaxMonth", i), a || n[v]("option", {
                            SelectedMonth: i
                        }), o[v]("Update"), d && s && u.removeAttr("disabled")
                    } else "set-attr" !== e.type || "disabled" !== e.attr && "readonly" !== e.attr || (p.hasClass("_open") && h.trigger("click"), f.attr("disabled", g.is(":disabled") || m.is(":disabled")))
                }), a.data("datepickerElement", n), n.on("click", function (t) {
                    return t.stopPropagation(), !1
                })
            }
            a.add(o)[v](), S(o, a, m, !1), S(a, o, g, !0), W(), "number" == typeof l && (l = String(l)), "number" == typeof c && (c = String(c)), (l || c) && p.toggleClass("_modified", l !== g.val() || c !== m.val()), f.attr("disabled", !!g.add(m).is(":disabled")), i.on("click", function () {
                p.removeClass("_tab-to")
            }), n.on("click", function () {
                p.addClass("_tab-to")
            }), t.on("click", R), p.on("filter-clear", R), f.add(h).add(u).on("click", function () {
                p.toggleClass("_open"), p.hasClass("_open") ? (p.removeClass("_tab-to"), app.dom.$document.off("click", w), app.dom.$document.on("click", w), T()) : (e.data("pos", ""), d && s ? p.hasClass("_changed") && p.trigger("filter-select") : R())
            })
        })
    }, app.datepicker = function (t) {
        var m = ["I", "II", "III"];
        app.findWithRoot(t, "[data-datepicker-filter], [data-decadepicker-filter]").each(function () {
            var n = $(this),
                o = n.find(".datepicker-filter_button"),
                r = n.find(".datepicker-filter_close"),
                t = n.find(".datepicker-filter_clear-btn"),
                d = n.find(".datepicker-filter_input"),
                s = n.find(".datepicker-filter_datepicker"),
                e = n.is("[data-decadepicker-filter]"),
                l = e ? "decadepicker" : "datepicker",
                a = n.data("date-text");

            function c(t) {
                return e && (t = m[t[0] - 1] + t.slice(1)), a && (t = a.replace("$$date$$", t)), t
            }

            function i(t) {
                $.contains(n.get(0), t.target) || (n.removeClass("_open"), app.dom.$document.off("click", i), d.val() || n.trigger("clear-datepicker"))
            }
            var p = app.l10n[l].plugin.dateFormat;
            s[l]({
                yearRange: "-99:+99",
                changeMonth: !0,
                changeYear: !0,
                minDate: n.data("min-date"),
                maxDate: n.data("max-date"),
                dateFormat: p
            }), s[l]("option", app.l10n[l].plugin);
            try {
                var f = $[l].parseDate(p, d.val()),
                    h = $[l].formatDate(p, f)
            } catch (t) {}
            f ? (o.html(c(h)), s[l]("setDate", f), d.prop("value", h)) : (o.html(app.l10n[l].emptyValue), n.addClass("_empty"), s.addClass("_empty"));
            var u = n.data("default-value") || h;

            function g() {
                d.prop("value", ""), s.addClass("_empty"), n.addClass("_empty").removeClass("_changed _modified _open"), o.html(app.l10n[l].emptyValue), app.dom.$document.off("click", i), n.trigger("clear-datepicker"), setTimeout(function () {
                    n.trigger("filter-select")
                })
            }
            u && n.toggleClass("_modified", h !== u), s[l]("option", {
                onSelect: function (t) {
                    d.prop("value", t), d.trigger("input-hook", [{
                        type: "set-value",
                        value: t
                    }, !0])
                }
            }), d.on("input-hook", function (t, e, a) {
                if ("set-value" === e.type) {
                    var i = e.value;
                    o.html(c(i)), n.removeClass("_empty _open").toggleClass("_modified", i !== u), s.removeClass("_empty"), d.trigger("filter-select"), a || s[l]("setDate", f)
                } else "set-attr" !== e.type || "disabled" !== e.attr && "readonly" !== e.attr || (n.hasClass("_open") && r.trigger("click"), o.attr("disabled", e.value))
            }), s.on("click", function (t) {
                return t.stopPropagation(), !1
            }), d.data("datepickerElement", s), t.on("click", g), n.on("filter-clear", g), o.attr("disabled", !!d.is(":disabled")), o.add(r).on("click", function () {
                n.toggleClass("_open"), n.hasClass("_open") ? (app.dom.$document.off("click", i), app.dom.$document.on("click", i), n.offset().left + n.width() / 2 > app.dom.$window.width() / 2 ? n.addClass("_right") : n.removeClass("_right")) : d.val() || n.trigger("clear-datepicker")
            })
        })
    }, app.datepickerPeriod = function (t) {
        var R = ["I", "II", "III"];
        app.findWithRoot(t, "[data-datepicker-period-filter], [data-decadepicker-period-filter]").each(function () {
            var d, s, l, c, p = $(this),
                f = p.find(".datepicker-filter_button"),
                h = p.find(".datepicker-filter_close"),
                u = p.find(".datepicker-filter_apply-btn"),
                t = p.find(".datepicker-filter_clear-btn"),
                e = p.find(".datepicker-filter_modal"),
                i = p.find(".datepicker-filter_tab-from"),
                n = p.find(".datepicker-filter_tab-to"),
                g = p.find(".datepicker-filter_input-from"),
                m = p.find(".datepicker-filter_input-to"),
                a = p.find(".datepicker-filter_datepicker-from"),
                o = p.find(".datepicker-filter_datepicker-to"),
                r = p.is("[data-decadepicker-period-filter]"),
                v = r ? "decadepicker" : "datepicker",
                _ = p.data("date-text");

            function b(t) {
                $.contains(p.get(0), t.target) || (p.removeClass("_open"), app.dom.$document.off("click", b), d && s ? p.hasClass("_changed") && p.trigger("filter-select") : C())
            }

            function k(t) {
                return t && r && (t = R[t[0] - 1] + t.slice(1)), t || "<span>" + app.l10n[v].emptyValue + "</span>"
            }

            function w() {
                var t = k(d),
                    e = k(s),
                    a = d || s ? " - " : "<span> - </span>";
                i.html(t), n.html(e), f.html(function (t) {
                    return _ && (t = _.replace("$$date$$", t)), t
                }(t + a + e))
            }

            function C(t) {
                d = s = void 0, g.add(m).prop("value", ""), w(), p.removeClass("_changed  _modified _open"), a.add(o).addClass("_empty"), a[v]("option", "maxDate", o[v]("option", "maxDate")), o[v]("option", "minDate", a[v]("option", "minDate")), app.dom.$document.off("click", b), p.trigger("clear-datepicker"), t && p.hasClass("_changed") && setTimeout(function () {
                    p.trigger("filter-select")
                })
            }

            function y() {
                if (p.hasClass("_open"))
                    if (p.offset().left + 2 * p.outerWidth() / 3 > 2 * app.dom.$window.width() / 3) {
                        if ("left" === e.data("pos")) return;
                        e.data("pos", "left"), e.css("transform", "translateX(" + (-e.outerWidth() + f.outerWidth()) + "px)")
                    } else if (p.offset().left + p.outerWidth() / 3 > app.dom.$window.width() / 3) {
                    if ("center" === e.data("pos")) return;
                    e.data("pos", "center"), e.css("transform", "translateX(" + (-e.outerWidth() + f.outerWidth()) / 2 + "px)")
                } else {
                    if ("right" === e.data("pos")) return;
                    e.data("pos", "right"), e.css("transform", "")
                }
            }
            var x = app.l10n[v].plugin.dateFormat;

            function W(n, o, e, r) {
                n[v]("option", {
                    yearRange: "-99:+99",
                    changeMonth: !0,
                    changeYear: !0,
                    minDate: p.data("min-date"),
                    maxDate: p.data("max-date"),
                    onSelect: function (t) {
                        t !== e.val() && (e.prop("value", t), e.trigger("input-hook", [{
                            type: "set-value",
                            value: t
                        }, !0]))
                    }
                }), e.on("input-hook", function (t, e, a) {
                    if ("set-value" === e.type) {
                        var i = e.value;
                        r ? d = i : s = i, w(), y(), p.addClass("_tab-to _changed").toggleClass("_modified", l !== d || c !== s), n.removeClass("_empty"), o[v]("option", r ? "minDate" : "maxDate", i), d && s && u.removeAttr("disabled"), a || n[v]("setDate", $[v].parseDate(x, i))
                    } else "set-attr" !== e.type || "disabled" !== e.attr && "readonly" !== e.attr || (p.hasClass("_open") && h.trigger("click"), f.attr("disabled", g.is(":disabled") || m.is(":disabled")))
                });
                try {
                    var t = $[v].parseDate(x, e.val()),
                        a = $[v].formatDate(x, t)
                } catch (t) {}
                if (t) r ? d = a : s = a, r ? l = p.data("default-value-from") || a : c = p.data("default-value-to") || a, o[v]("option", r ? "minDate" : "maxDate", t), n[v]("setDate", t);
                else if (u.attr("disabled", !0), n.addClass("_empty"), r) {
                    var i = new Date;
                    i.setMonth(i.getMonth() - 1), n[v]("setDate", i)
                }
                e.data("datepickerElement", n), n.on("click", function (t) {
                    return t.stopPropagation(), !1
                })
            }
            a.add(o)[v](app.l10n[v].plugin), W(o, a, m, !1), W(a, o, g, !0), w(), (l || c) && p.toggleClass("_modified", l !== d || c !== s), f.attr("disabled", !!g.add(m).is(":disabled")), i.on("click", function () {
                p.removeClass("_tab-to")
            }), n.on("click", function () {
                p.addClass("_tab-to")
            }), t.on("click", C), p.on("filter-clear", C), f.add(h).add(u).on("click", function () {
                p.toggleClass("_open"), p.hasClass("_open") ? (p.removeClass("_tab-to"), app.dom.$document.off("click", b), app.dom.$document.on("click", b), y()) : (e.data("pos", ""), d && s ? p.hasClass("_changed") && p.trigger("filter-select") : C())
            })
        })
    }, app.yearpickerPeriod = function (t) {
        app.findWithRoot(t, "[data-yearpicker-period-filter]").each(function () {
            var n, o, r, d, s = $(this),
                l = s.find(".datepicker-filter_button"),
                c = s.find(".datepicker-filter_close"),
                p = s.find(".datepicker-filter_apply-btn"),
                t = s.find(".datepicker-filter_clear-btn"),
                e = s.find(".datepicker-filter_modal"),
                i = s.find(".datepicker-filter_tab-from"),
                f = s.find(".datepicker-filter_tab-to"),
                h = s.find(".datepicker-filter_input-from"),
                u = s.find(".datepicker-filter_input-to"),
                a = s.find(".datepicker-filter_datepicker-from"),
                g = s.find(".datepicker-filter_datepicker-to"),
                m = $('<div class="ui-yearpicker" />').appendTo(a),
                v = $('<div class="ui-yearpicker" />').appendTo(g),
                _ = +s.data("min-date") || 1970,
                b = +s.data("max-date") || (new Date).getFullYear();

            function k(t) {
                $.contains(s.get(0), t.target) || (s.removeClass("_open"), app.dom.$document.off("click", k), r && d ? s.hasClass("_changed") && s.trigger("filter-select") : x())
            }

            function w(t) {
                return t ? t + " " + app.l10n.yearpicker.emptyValue.toLocaleLowerCase() : "<span>" + app.l10n.yearpicker.emptyValue + "</span>"
            }

            function C() {
                var t = w(r),
                    e = w(d),
                    a = r || d ? " - " : "<span> - </span>";
                i.html(t), f.html(e), l.html(t + a + e)
            }

            function y() {
                [m, v].forEach(function (t, e) {
                    var a = !e;
                    t.children().each(function () {
                        var t = +$(this).text();
                        $(this).attr("disabled", a ? d < t : t < r), $(this).toggleClass("_active", a ? t === r : t === d)
                    })
                })
            }

            function x(t) {
                r = d = void 0, h.add(u).prop("value", ""), C(), y(), s.removeClass("_changed _modified _open"), app.dom.$document.off("click", k), s.trigger("clear-datepicker"), t && s.hasClass("_changed") && setTimeout(function () {
                    s.trigger("filter-select")
                })
            }

            function W() {
                if (s.hasClass("_open"))
                    if (s.offset().left + 2 * s.outerWidth() / 3 > 2 * app.dom.$window.width() / 3) {
                        if ("left" === e.data("pos")) return;
                        e.data("pos", "left"), e.css("transform", "translateX(" + (-e.outerWidth() + l.outerWidth()) + "px)")
                    } else if (s.offset().left + s.outerWidth() / 3 > app.dom.$window.width() / 3) {
                    if ("center" === e.data("pos")) return;
                    e.data("pos", "center"), e.css("transform", "translateX(" + (-e.outerWidth() + l.outerWidth()) / 2 + "px)")
                } else {
                    if ("right" === e.data("pos")) return;
                    e.data("pos", "right"), e.css("transform", "")
                }
            }

            function R() {
                m.add(v).find("button._active").each(function () {
                    var t = $(this),
                        e = t.parent(),
                        a = t.position(),
                        i = e.scrollTop(),
                        n = e.height();
                    e.scrollTop(i + a.top - n / 2)
                })
            }

            function T(t, e) {
                t.empty();
                for (var a = _; a <= b; a++) {
                    $('<button type="button" class="ui-yearpicker-item" />').text(a).appendTo(t).on("click", function () {
                        var t = +$(this).text();
                        e.val(t)
                    })
                }
            }

            function S() {
                T(m, h), T(v, u), y(), C()
            }

            function M(t, e, a) {
                if ("option" === t) switch (e) {
                    case "maxYear":
                        if (!a) return b; + a ? (b = +a, S(), r && b < d && u.val(b), d && d < r && h.val(d)) : console.error("maxYear - expected integer value, but received", a);
                        break;
                    case "minYear":
                        if (!a) return _; + a ? (_ = +a, r && r < _ && h.val(_), d && d < r && u.val(r), S()) : console.error("minYear - expected integer value, but received", a)
                }
            }

            function L(t, e, i) {
                T(t, e), e.on("input-hook", function (t, e) {
                    if ("set-value" === e.type) {
                        var a = +e.value;
                        i ? r = a : d = a, C(), W(), y(), s.addClass("_changed").toggleClass("_modified", n !== r || o !== d), i && f.is(":visible") && f.trigger("click"), r && d && p.removeAttr("disabled")
                    } else "set-attr" !== e.type || "disabled" !== e.attr && "readonly" !== e.attr || (s.hasClass("_open") && c.trigger("click"), l.attr("disabled", e.value))
                });
                try {
                    var a = +e.val()
                } catch (t) {}
                a ? i ? r = a : d = a : p.attr("disabled", !0), i ? n = +s.data("default-value-from") || a : o = +s.data("default-value-to") || a, e.data("datepickerElement", {
                    yearpicker: M
                })
            }
            L(v, u, !1), L(m, h, !0), C(), y(), (n || o) && s.toggleClass("_modified", n !== r || o !== d), l.attr("disabled", !!h.add(u).is(":disabled")), i.on("click", function () {
                s.removeClass("_tab-to"), R()
            }), f.on("click", function () {
                s.addClass("_tab-to"), R()
            }), t.on("click", x), s.on("filter-clear", x), l.add(c).add(p).on("click", function () {
                s.toggleClass("_open"), s.hasClass("_open") ? (s.removeClass("_tab-to"), app.dom.$document.off("click", k), app.dom.$document.on("click", k), R(), W()) : (e.data("pos", ""), r && d ? s.hasClass("_changed") && s.trigger("filter-select") : x())
            })
        })
    }, app.menu = function (t) {
        var e = app.findWithRoot(t, "[data-menu]"),
            a = e.find("[data-menu-item]"),
            i = e.find("[data-menu-item-btn]"),
            n = app.findWithRoot(t, "[data-menu-show]"),
            o = app.findWithRoot(t, "[data-menu-close]");

        function r() {
            e.removeClass("show"), n.removeClass("_active"), app.dom.$body.removeClass("menu-open")
        }
        n.on("click", function () {
            $(this).hasClass("_active") ? r() : (app.dom.$body.addClass("menu-open"), e.addClass("show"), n.addClass("_active"), $(this).trigger("open-menu"))
        }), o.on("click", r), i.on("click", function () {
            var t = $(this).closest(a);
            t.hasClass("_active") ? t.removeClass("_active") : (a.filter("._active").removeClass("_active"), t.addClass("_active"))
        })
    }, app.filters = function (t) {
        var i = app.findWithRoot(t, "[data-filter]"),
            f = i.find("[data-filter-title]"),
            e = i.find("[data-filter-close]"),
            n = i.find("[data-filter-content]"),
            a = app.findWithRoot(t, "form[data-auto-submit]"),
            o = i.filter('[data-filter="select"]'),
            r = i.filter('[data-filter="switch"]'),
            d = app.findWithRoot(t, "[data-select-with-date]"),
            s = i.filter('[data-filter="checkboxes"]'),
            l = i.find(".home-region"),
            c = ($(".geo-city__arrow"), $("#filter-select--home-region")),
            p = $(".geo-city__link");

        function h(t) {
            return Math.ceil(t.innerWidth()) < Math.floor(t[0].scrollWidth)
        }

        function u(t, e) {
            h(t) ? t.attr("title", e) : t.removeAttr("title")
        }
        if (l.each(function (t, e) {
                var a = e.getAttribute("data-select-home");
                "" !== a && (e.style.display = "block", e.textContent = a)
            }), window.localStorage) try {
            var g = JSON.parse(localStorage.getItem("submit-scroll"));
            g && g.pathname === location.pathname && app.dom.$window.scrollTop(g.scrollTop), localStorage.removeItem("submit-scroll")
        } catch (t) {}
        a.on("filter-select", function () {
            window.localStorage && localStorage.setItem("submit-scroll", JSON.stringify({
                pathname: location.pathname,
                scrollTop: app.dom.$window.scrollTop()
            })), $(this).submit()
        }), e.on("click", function () {
            v($(this).closest(i))
        }), f.on("click", function (t) {
            var e = $(this),
                a = e.closest(i);
            a.hasClass("open") ? a.find(n).hide() : (a.find(n).show(), a.find(".filter-select_search").length && a.find(".filter-select_search input").prop("value", "").trigger("input").focus()), e.toggleClass("filter_title_custom-supper"), a.toggleClass("open")
        });
        var m = document.querySelector("[data-filter-title]");

        function v(t, e) {
            !e && t.data("modified") && t.trigger("filter-select"), t.removeClass("open").find(n).hide()
        }

        function _(t) {
            return t.contents().filter(function () {
                return 3 === this.nodeType
            }).first()
        }
        m && window.addEventListener("click", function (t) {
            t.target !== m && m.classList.remove("filter_title_custom-supper")
        }), app.dom.$document.click(function (a) {
            i.each(function () {
                var t = $(this),
                    e = $(".geo-city__arrow");
                $(a.target).closest(t).length || v(t), e && e.removeClass("geo-city__arrow_rotate")
            })
        }), r.each(function () {
            var e = $(this),
                t = e.find("label:eq(0)"),
                a = e.find("div:first-child:eq(0)"),
                i = e.find("input"),
                n = e.is("[data-default-value]");

            function o(t) {
                $(t.target).trigger("filter-select"), e.toggleClass("_changed", n !== i.is(":checked"))
            }
            h(a) || t.removeAttr("title"), e.toggleClass("_changed", n !== i.is(":checked")), i.on("change", o), i.on("input-hook", o)
        }), d.on("select-date", function (t, e, a) {
            var i = $(this);
            i.addClass("_date").data("last-checked", e), a || setTimeout(function () {
                i.find(".datepicker-filter_button").trigger("click")
            }, 0)
        }), d.on("clear-datepicker", function () {
            function t(t) {
                t.stopPropagation()
            }
            var e = $(this),
                a = e.find('[data-filter="select"]'),
                i = a.data("default-value");
            void 0 === i && (i = a.find("input:radio:eq(0)").val()), "number" == typeof i && (i = String(i));
            var n = a.find('input:radio[value="' + i + '"]'),
                o = e.data("last-checked") || n;
            e.removeClass("_date"), o.prop("checked", !0).on("filter-select", t), e.find('[data-filter="select"]').removeClass("_changed"), setTimeout(function () {
                e.off("filter-select", t)
            })
        }), jQuery.expr[":"].Contains = function (t, e, a) {
            return -1 !== (t.textContent || t.innerText || "").toUpperCase().indexOf(a[3].toUpperCase())
        }, o.each(function () {
            var a, i, n, r = $(this),
                o = r.find(f),
                t = r.find('input[type="radio"]'),
                d = "",
                s = null,
                e = r.find(".filter-select_search input");

            function l(t, e, a) {
                var i;
                if (c && "filter_city_0" !== $(a).attr("id")) {
                    c.css({
                        display: "block"
                    }), i = a ? a.attr("data-region-href") : t.attr("data-region-href"), p.attr("href", i), c.attr("data-home-href", i), p.css({
                        display: "flex"
                    }), c.attr("data-select-home", e);
                    var n = c.attr("data-select-home");
                    c.text(n)
                }
            }
            t.filter(":checked").length || t.first().prop("checked", !0), s = t.filter(":checked").siblings("label"), d = s.text(), s.find(".filter-select_option_text").length && (d = d.replace(s.find(".filter-select_option_text").text(), "")), "no-change" !== o.attr("data-filter-title") && o.text(d), l(r, d, t.filter(":checked")), u(o, d), r.removeAttr("title"), a = t.filter(":checked:eq(0)"), n = a.val(), void 0 === (i = r.data("default-value")) && (i = n), "number" == typeof i && (i = String(i)), r.toggleClass("_changed", i !== a.val()), a.is("[data-select-date]") && a.trigger("select-date", [null, !0]), r.on("change", function (t, e) {
                    $this = $(t.target), $this.is("input:radio") && (Array.from(a.parents("[data-disable-checked]")).length && a.prop("checked", !0), s = $this.siblings("label"), d = s.text(), s.find(".filter-select_option_text").length && (d = d.replace(s.find(".filter-select_option_text").text(), "")), "no-change" !== o.attr("data-filter-title") && (o.text(d), u(o, d)), l($this, d), r.toggleClass("_changed", i !== $this.val()), r.data("modified", !$this.is("[data-select-date]") && n !== $this.val()), v(r, $this.is("[data-select-date]") || !!e), $this.is("[data-select-date]") && $this.trigger("select-date", [a]))
                }),
                function () {
                    if (!e.length) return;
                    var n = r.find(".filter-select_search_empty"),
                        o = null;
                    e.on("input", function (t) {
                        var e = r.find(".filter-select_option"),
                            a = $(this).val(),
                            i = $(".filter-select_options");
                        return a ? (o = e.find("label:Contains(" + a + ")").closest(".filter-select_option"), e.not(o).hide(), o.show(), o.length ? (n.hide(), i.removeClass("filter-select_options-hidden")) : (n.show(), i.addClass("filter-select_options-hidden")), o.each(function () {
                            var t = $(this).find("label");
                            t.html(t.html().replace(/<b>([^<]*)<\/b>/gi, "$1")), t.html(t.html().replace(new RegExp(a, "i"), "<b>$&</b>")), $(this).parents(".level").each(function () {
                                var t = $(this).prev(".filter-select_option").first();
                                t.html(t.html().replace(/<b>([^<]*)<\/b>/gi, "$1")), t.html(t.html().replace(new RegExp(a, "i"), "<b>$&</b>")), t.show()
                            })
                        })) : (e.each(function () {
                            var t = $(this).find("label");
                            t.html(t.html().replace(/<b>([^<]*)<\/b>/gi, "$1"))
                        }), n.hide(), i.removeClass("filter-select_options-hidden"), e.show()), !1
                    })
                }()
        }), s.each(function () {
            var t, e, a = $(this),
                i = a.find(f),
                n = a.find("[data-filter-btn]"),
                o = a.find("[data-filter-counter]"),
                r = a.find(".filter_placeholder"),
                d = a.find("input"),
                s = 0,
                l = r.text();

            function c() {
                return a.find("input").filter(":checked").map(function () {
                    return $(this).attr("value")
                }).get().join()
            }

            function p() {
                s = a.find("input").filter(":checked").length || "", o.text(s), _(i).replaceWith(s ? app.l10n.filter.selected : l), a.toggleClass("_changed", t !== c()), r.toggleClass("_hide", !s), a.data("modified", e !== c())
            }
            s = d.filter(":checked").length || "", o.text(s), _(i).replaceWith(s ? app.l10n.filter.selected : l), r.toggleClass("_hide", !s), u(i, i.attr("title")), e = c(), void 0 === (t = a.data("default-value")) && (t = e), "number" == typeof t && (t = String(t)), a.toggleClass("_changed", t !== c()), a.on("change", p), a.on("input-hook", p), n.on("click", function () {
                v(a)
            })
        })
    }, app.orgStructure = function (t) {
        app.findWithRoot(t, ".org-structure_el_icon, .org-structure_el_position:not(a)").on("click", function () {
            var t = $(this).closest(".org-structure_el");
            if (t.hasClass("open")) {
                if (1 === t.children(".org-structure_list").children(".org-structure_el").length) return;
                t.removeClass("open").find(".org-structure_el").removeClass("open").parent(".org-structure_list").removeClass("has-open-child"), t.parent(".org-structure_list").removeClass("has-open-child")
            } else t.addClass("open"), t.parent(".org-structure_list").addClass("has-open-child")
        });
        var a = app.findWithRoot(t, ".org-structure"),
            e = a.find(".org-structure_search input"),
            i = a.find(".org-structure_main"),
            n = app.findWithRoot(t, ".org-structure_el_position, .org-structure_el_name"),
            o = ".org-structure_el, .org-structure_main";
        e.on("input", function () {
            a.find(o).removeClass("_visible open"), n.each(function () {
                $(this).html($(this).html().replace(/<mark>([^<]*)<\/mark>/gi, "$1"))
            });
            var t = $(this).val();
            if (3 <= t.length) {
                i.addClass("_onsearch"), t = t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                var e = new RegExp(t, "ig");
                n.filter(function () {
                    return e.test($(this).html())
                }).each(function () {
                    $(this).addClass("_visible").html($(this).html().replace(e, "<mark>$&</mark>")).parentsUntil(a, o).addClass("_visible").filter(":not(:eq(0))").addClass("open")
                })
            } else i.removeClass("_onsearch")
        })
    }, app.calendar = function (t) {
        var a = app.findWithRoot(t, ".calendar_weekdays"),
            i = a.parent(),
            n = app.findWithRoot(t, ".excursion_submit"),
            o = n.parent();
        if (a.length && n.length) {
            function e() {
                if (!i.length) return !1;
                var t = i[0].getBoundingClientRect();
                t.top > app.dom.$header.height() || t.bottom < a.outerHeight() ? a.removeClass("_fixed").width("") : t.top <= 0 && a.addClass("_fixed").width(t.width);
                var e = o[0].getBoundingClientRect();
                e.bottom - app.dom.$window.height() + n.outerHeight() <= 0 ? n.removeClass("_fixed").width("") : 0 <= e.bottom - app.dom.$window.height() && n.addClass("_fixed").width(e.width)
            }
            e(), app.dom.$window.on("scroll", e), app.dom.$window.on("resize", function () {
                a.hasClass("_fixed") && a.width(i.width()), n.hasClass("_fixed") && n.width(o.width())
            });
            var r = app.findWithRoot(t, "input.calendar_time_input"),
                d = app.findWithRoot(t, "input.excursion_submit_captcha_input"),
                s = app.findWithRoot(t, "input.excursion_submit_button");
            r.add(d).on("change input", function () {
                var t = r.is(":checked");
                t && n.addClass("_active"), t && d.val() ? s.attr("disabled", !1) : s.attr("disabled", !0)
            })
        }
    }, app.ajaxNews = function (t) {
        var n = 1;
        app.findWithRoot(t, "[data-news-ajax-url]").click(function () {
            var e = $(this),
                a = e.prev(),
                t = e.data("news-ajax-url"),
                i = 0 <= t.indexOf("?") ? "&" : "?";
            t += i + "page=" + n++, e.attr("disabled", !0).addClass("_loading"), $.ajax({
                url: t,
                dataType: "json"
            }).done(function (t) {
                t.items.forEach(function (t) {
                    $('<div class="news _in-feed col-md-17' + (t.big ? " _big" : "") + (t.video ? " _with-video" : "") + '"><div class="news_inner"' + (t.big ? ' style="background-image: url(' + t.image + ');"' : "") + '><div class="news_text"><div class="news_info"><div class="news_date">' + t.date + '</div><div class="news_category">' + t.category + '</div></div><div class="news_title"><a href="' + t.href + '">' + t.title + "</a></div></div>" + (t.image ? '<a href="' + t.href + '" class="col-md-5 offset-md-1 news_image"><img src="' + t.image + '" /></a>' : "") + "</div></div>").appendTo(a)
                }), a.trigger("new-html"), t.isLast && e.remove()
            }).always(function () {
                e.attr("disabled", !1).removeClass("_loading")
            })
        })
    }, app.ajaxPreviews = function (n) {
        var o = 1;
        app.findWithRoot(n, "[data-previews-ajax-url]").click(function () {
            var e = $(this),
                a = app.findWithRoot(n, "#previews-ajax-container"),
                t = e.data("previews-ajax-url"),
                i = 0 <= t.indexOf("?") ? "&" : "?";
            t += i + "page=" + o++, e.attr("disabled", !0).addClass("_loading"), $.ajax({
                url: t,
                dataType: "json"
            }).done(function (t) {
                t.items.forEach(function (t) {
                    $('<div class="home-previews_day">  \t<div class="home-previews_day-date">' + t.date + "</div>" + t.elements.map(function (t) {
                        return '<div class="home-previews_item">  <div class="row flex-md-nowrap">    <div class="col-md-2">      <div class="home-previews_item-time">' + t.time + '</div>    </div>    <div class="home-previews_item-title">      <a href="' + t.href + '">' + t.title + "</a>    </div>" + (t.important ? '<div class="home-previews_item-icon offset-md-1 icon-important"></div>' : "") + '  </div>  <div class="offset-md-2 row home-previews_item-source_wrap">    <div class="home-previews_item-source">' + t.source + "</div>  </div></div>"
                    }).join("") + "   </div></div>").appendTo(a)
                }), t.isLast && e.remove()
            }).always(function () {
                e.attr("disabled", !1).removeClass("_loading")
            })
        })
    }, app.ajaxAbout = function (t) {
        var i = 1;
        app.findWithRoot(t, "[data-about-ajax-url]").click(function () {
            var e = $(this),
                t = e.data("about-ajax-url"),
                a = 0 <= t.indexOf("?") ? "&" : "?";
            t += a + "page=" + i++, e.attr("disabled", !0).addClass("_loading"), $.ajax({
                url: t,
                dataType: "json"
            }).done(function (t) {
                t.items.forEach(function (t) {
                    $('<div class="document-regular">  <div class="document-regular_inner">    <div class="document-regular_top">      <div class="document-regular_left_icon"></div>      <div class="document-regular_date">' + t.date + '</div>    </div>    <div class="body-2 document-regular_main">      <div class="document-regular_texts">        <div class="document-regular_name">        \t<a href="' + t.link + '"><span class="document-regular_name_visible">' + t.text + '</span></a>        </div>        <div class="document-regular_comment"></div>      </div>    </div>  </div></div>').insertBefore(e)
                }), t.isLast && e.remove()
            }).always(function () {
                e.attr("disabled", !1).removeClass("_loading")
            })
        })
    }, app.ajaxCross = function (t) {
        $(t).find("[data-cross-ajax-url]").click(function () {
            var i = $(this),
                n = i.prev(),
                t = i.data("cross-ajax-url");
            i.attr("disabled", !0).addClass("_loading"), $.ajax({
                url: t,
                dataType: "html"
            }).done(function (t) {
                var e = $(t);
                e.appendTo(n);
                var a = e.data("cross-ajax-url");
                a ? i.data("cross-ajax-url", a) : i.remove(), e.trigger("new-html")
            }).always(function () {
                i.attr("disabled", !1).removeClass("_loading")
            })
        })
    }, app.shareBtn = function (t) {
        app.findWithRoot(t, "[data-share-btn]").on("click", function (e) {
            var a = $(this),
                i = a.next();
            if (i.toggleClass("_hide"), !i.hasClass("_hide")) {
                var n = function (t) {
                    $.contains(a.parent().get(0), t.target) || e === t || (i.addClass("_hide"), $(document).off("click", n))
                };
                $(document).on("click", n)
            }
        })
    }, app.tables = function (e) {
        app.findWithRoot(e, "[data-table-fixed] table:first").floatThead({
            responsiveContainer: function (t) {
                return t.closest("[data-table-fixed]")
            },
            debug: !0,
            zIndex: 10,
            position: "fixed"
        });
        var t = $("[data-table-fixed] > table.data_dobn");
        !0 == (-1 < window.navigator.userAgent.indexOf("MSIE ") || -1 < window.navigator.userAgent.indexOf("Trident/")) && t && $("[data-table-fixed] > table").css({
            "padding-top": "160px"
        }), app.findWithRoot(e, "table.data, table.CBRTBL").each(function () {
            var n = [];
            $(this).find("tr").each(function () {
                for (var i = [], t = n.length - 1; 0 <= t; t--) n[t].span--;
                $(this).find("td").each(function () {
                    var t = $(this),
                        e = t.attr("rowspan");
                    t.data("linked_td", $.merge([], i));
                    for (var a = i.length - 1; 0 <= a; a--) i[a].data("linked_td").push(t);
                    for (a = n.length - 1; 0 <= a; a--) 0 < n[a].span && (t.data("linked_td").push(n[a].$td), n[a].$td.data("linked_td").push(t));
                    1 < (e = e || 1) && n.push({
                        span: e,
                        $td: t
                    }), i.push(t), t.mouseover(function () {
                        var t = $(this).addClass("hover").data("linked_td");
                        if (t)
                            for (var e = t.length - 1; 0 <= e; e--) t[e].addClass("hover")
                    }), t.mouseout(function () {
                        var t = $(this).removeClass("hover").data("linked_td");
                        if (t)
                            for (var e = t.length - 1; 0 <= e; e--) t[e].removeClass("hover")
                    })
                })
            })
        }), app.findWithRoot(e, ".table-with-documents .toggle-button").on("click", function () {
            $(this).toggleClass("_active").closest("tr").toggleClass("_open")
        }), updateTablesWithDocuments = function () {
            var t = app.dom.$window.width() < 1024;
            app.findWithRoot(e, ".table-with-documents_files").each(function () {
                $(this).children("td:last").attr("colspan", t ? $(this).find("td").length : 1)
            })
        }, updateTablesWithDocuments(), app.dom.$window.resize(updateTablesWithDocuments)
    }, app.topLine = function (t) {
        var e = app.findWithRoot(t, "[data-top-line]");
        e.length && app.dom.$window.on("scroll", function () {
            app.dom.$window.scrollTop() > app.dom.$header.height() && -1 === app.utils.getDirection.direction ? (e.addClass("_show"), $("body").addClass("header-fixed")) : (e.removeClass("_show"), $("body").removeClass("header-fixed"))
        })
    }, app.homeMenuButton = function (t) {
        var e = app.findWithRoot(t, ".header_menu, .banner-header"),
            a = app.findWithRoot(t, ".home-header_content, .banner-header");

        function i() {
            app.dom.$window.scrollTop() < a.outerHeight() / 2 ? e.addClass("_white") : e.removeClass("_white")
        }
        e.length && (i(), app.dom.$window.on("scroll", i))
    }, app.tips = function (t) {
        tippy("[data-tooltip], .footnote", {
            content: function (t) {
                var e = t.getAttribute("data-tooltip-content") || t.getAttribute("data-footnote") || t.title;
                return t.removeAttribute("title"), e
            },
            placement: "bottom-start",
            onCreate: function (t) {
                if (t.reference.title) return t.setProps({
                    placement: "bottom"
                })
            },
            allowHTML: !0,
            delay: [100, 500],
            interactive: !0,
            appendTo: document.body
        }), $(".economic-indicator_hint").click(function (t) {
            t.preventDefault(), t.stopPropagation()
        })
    }, app.tabsWithFilters = function (t) {
        app.findWithRoot(t, ".tabs_filters_wrap").each(function () {
            var t = $(this),
                e = t.find(".tabs_filters_btn"),
                a = t.find(".tabs_filters");
            a.attr("data-open-filter") && a.show(), e.on("click", function () {
                $(this).toggleClass("_active"), a.toggle()
            })
        })
    },
    // app.homeTabs = function (r) {
    //     app.findWithRoot(r, "[data-home-tabs]").each(function () {
    //         var t = $(this),
    //             i = t.find("[data-tabs-tab]"),
    //             n = t.find("[data-tabs-mobile-selected]"),
    //             o = t.find("[data-tabs-content]");

    //         function e(t) {
    //             t.preventDefault(), app.findWithRoot(r, ".tabs_items").hide(), n.removeClass("_active");
    //             var e = $(this);
    //             if (e.hasClass("_active")) return !1;
    //             var a = e.data("tabsTab");
    //             i.removeClass("_active").attr("aria-selected", "false"), e.addClass("_active").attr("aria-selected", "true"), n.text(e.text()), o.hide().filter('[data-tabs-content="' + a + '"]').show()
    //         }
    //         n.on("click", function () {
    //             n.toggleClass("_active"), app.findWithRoot(r, ".tabs_items").toggle()
    //         }), i.on("click", e), app.onPressSpace(i, e)
    //     })
    // }, 
    // app.tabs = function (t) {
    //     var e = app.findWithRoot(t, "[data-tabs]");
    //     if (e.length && (e.each(function () {
    //             var t = $(this),
    //                 e = t.find("[data-tabs-tab]"),
    //                 a = e.filter("._active"),
    //                 i = t.find("[data-tabs-rest]"),
    //                 n = t.find("[data-tabs-rest-title]"),
    //                 o = t.find("[data-tabs-content]");

    //             function r() {
    //                 i.toggleClass("_open").attr("aria-expanded", Boolean(i.hasClass("_open")))
    //             }
    //             n.data("default-title", n.text()), e.on("click", function (t) {
    //                 t.preventDefault(), d($(this))
    //             }), app.onPressSpace(e, function () {
    //                 d($(this))
    //             }), n.on("click", r), app.onPressSpace(n, r), a.length && d(a, !0), e.on("open-tab", function () {
    //                 return d($(this)), !1
    //             }), o.on("open-anchor", function (t) {
    //                 $(t.target);
    //                 d(e.filter('[data-tabs-tab="' + $(this).data("tabsContent") + '"]'))
    //             })
    //         }), location.hash)) {
    //         var a = $('[href = "' + location.hash + '"][data-tabs-tab]');
    //         if (a.length) {
    //             var i = a.data("tabs-tab"),
    //                 n = a.closest("[data-tabs]").find('[data-tabs-content="' + i + '"]');
    //             setTimeout(function () {
    //                 n.trigger("open-anchor", [!0])
    //             }, 500)
    //         }
    //     }

    //     function d(t, e) {
    //         var a = t.closest("[data-tabs]"),
    //             i = a.find("[data-tabs-tab]"),
    //             n = a.find("[data-tabs-rest]"),
    //             o = a.find("[data-tabs-rest-title]"),
    //             r = a.find("[data-tabs-content]"),
    //             d = a.find("[data-tabs]");
    //         if (d.length) {
    //             function s() {
    //                 return 0 === d.has($(this)).length
    //             }
    //             i = i.filter(s), n = n.filter(s), o = o.filter(s), r = r.filter(s)
    //         }
    //         if (t.hasClass("_active") && !e) return !1;
    //         i.removeClass("_active").attr("aria-selected", "false"), t.addClass("_active").attr("aria-selected", "true"), r.hide().filter('[data-tabs-content="' + t.data("tabsTab") + '"]').show().trigger("show-hidden"), !e && /^#.+$/.test(t.attr("href")) && (location.hash = t.attr("href")), t.closest(n).length ? (n.removeClass("_open").addClass("_active"), o.text(t.text())) : (n.removeClass("_open _active"), o.text(o.data("default-title")))
    //     }
    // }, 
    app.gotoUp = function (t) {
        app.findWithRoot(t, ".gotoUp").on("click", function (t) {
            t.preventDefault(), $("html, body").animate({
                scrollTop: 0
            }, 500)
        })
    }, app.dropdown = function (t) {
        var e = app.findWithRoot(t, ".dropdown"),
            a = app.findWithRoot(t, ".dropdown_title"),
            i = a.siblings(".dropdown_content");

        function n(t) {
            t.addClass("_active").attr("aria-expanded", "true"), t.siblings(".dropdown_content").trigger("show-hidden")
        }

        function o() {
            $(this).hasClass("_active") ? function (t) {
                t.removeClass("_active").attr("aria-expanded", "false")
            }($(this)) : n($(this))
        }
        a.length && (a = $.merge(a, i), (a = $.merge(a, e.children().children())).on("click", o), app.onPressSpace(a, o), a.on("open-anchor", function (t) {
            n($(this))
        }), i.on("open-anchor", function (t) {
            $(t.target);
            $(this).trigger("show-hidden").siblings(".dropdown_title").addClass("_active").attr("aria-expanded", "true")
        }), i.parent().on("set-dropdown-open", function (t, e) {
            return $(this).children(".dropdown_content").toggle(e), $(this).children(".dropdown_title").toggleClass("_active", e).attr("aria-expanded", String(e)), e && $(this).children(".dropdown_content").trigger("show-hidden"), !1
        }))
    }, app.toggle = function (t) {
        var e = app.findWithRoot(t, "[data-toggle-btn]"),
            i = app.findWithRoot(t, "[data-toggle-class-btn]"),
            n = app.findWithRoot(t, "[data-hide]");
        e.each(function () {
            var e = $(this),
                a = e.closest("[data-toggle]").find("[data-toggle-content]");

            function t(t) {
                null != t && t === e.hasClass("active") || (e.toggleClass("_active").attr("aria-expanded", Boolean(e.hasClass("_active"))), a.slideToggle())
            }
            n.on("click", function () {
                n.parent(".tabs_items").css("display", "none"), i.removeClass("_active")
            }), e.on("click", function () {
                t()
            }), a.on("open-anchor", function () {
                t(!0)
            })
        }), i.each(function () {
            var a = $(this),
                t = a.closest("[data-toggle]"),
                i = t.find("[data-toggle-content]").filter(function () {
                    return $(this).closest("[data-toggle]").is(t)
                });

            function e(t) {
                if (null == t || t !== a.hasClass("active")) {
                    var e = a.data("toggleClassBtn") || "_active";
                    a.toggleClass("_active").attr("aria-expanded", Boolean(a.hasClass("_active"))), i.toggleClass(e), i.hasClass(e) && i.trigger("show-hidden")
                }
            }
            a.on("click", function (t) {
                t.preventDefault(), e()
            }), i.on("open-anchor", function () {
                e(!0)
            })
        })
    }, app.toggleSelectPopup = function (t) {
        var e = app.findWithRoot(t, "[data-toggle-popup]").find("[data-toggle-content]"),
            a = app.findWithRoot(t, "[data-toggle-popup-class-btn]");
        app.findWithRoot(t, "[data-toggle-popup-class-btn]").on("click", function () {
            var t = $(this).data("toggleClassBtn") || "_active";
            $(this).toggleClass("_active"), $(this).closest("[data-toggle-popup]").find("[data-toggle-content]").toggleClass(t)
        }), e.length && app.dom.$document.click(function (t) {
            !e.is(":visible") || $(t.target).closest(e).length || $(t.target).closest(a).length || (e.removeClass("_active"), a.removeClass("_active"))
        })
    }, app.helpful = function (t) {
        app.findWithRoot(t, "[data-helpful]").each(function () {
            var t = $(this),
                e = t.find("[data-helpful-btn]"),
                a = t.siblings("[data-reason]"),
                i = t.siblings("[data-thankfulness]"),
                n = null,
                o = null,
                r = null,
                d = null,
                s = null;

            function l() {
                var t = a.find('input[type="radio"]:checked'),
                    e = t.is(".radio_another_button") ? n.val() : void 0;
                a.trigger("dislike-reason", {
                    value: t.val(),
                    message: e
                }), a.hide(), i.show()
            }
            e.on("click", function () {
                var t = $(this);
                if (t.hasClass("_active") || t.siblings("[data-helpful-btn]").hasClass("_active")) return !1;
                t.siblings("[data-helpful-btn]").addClass("_disabled"), t.addClass("_active"), "no" === t.data("helpfulBtn") && a.length && (a.show(), n = a.find("[data-reason-another-message]"), r = a.find('input[type="radio"]').not(".radio_another_reason"), o = a.find('input[type="radio"].radio_another_reason'), s = a.find("[data-reason-another-btn]"), n.on("input", function () {
                    d = !$.trim(n.val()), s.prop("disabled", d)
                }), r.on("change", l), o.on("change", function () {
                    n.focus()
                }), s.on("click", function () {
                    $(this).not(":disabled") && l()
                }))
            })
        })
    }, app.searchHelpful = function (t) {
        app.findWithRoot(t, "[data-search-helpful]").each(function () {
            var t = $(this),
                e = t.find("[data-helpful-btn]"),
                a = t.siblings("[data-reason]"),
                i = t.siblings("[data-thankfulness]"),
                n = null,
                o = null,
                r = null,
                d = null,
                s = null;
            e.on("click", function () {
                var t = $(this);
                if (t.hasClass("_active") || t.siblings("[data-helpful-btn]").hasClass("_active")) return !1;
                if (t.siblings("[data-helpful-btn]").addClass("_disabled"), t.addClass("_active"), "no" === t.data("helpfulBtn") && a.length) {
                    function e() {
                        d = !$(this).is(r) && !$.trim(n.val()), s.prop("disabled", d)
                    }
                    a.show(), n = a.find("[data-reason-another-message]"), r = a.find('input[type="radio"]').not(".radio_another_reason"), o = a.find('input[type="radio"].radio_another_reason'), s = a.find("[data-reason-another-btn]"), n.on("input", e), r.on("change", e), o.on("change", function () {
                        n.focus(), e()
                    }), s.on("click", function () {
                        $(this).not(":disabled") && function () {
                            var t = a.find('input[type="radio"]:checked'),
                                e = t.is(".radio_another_button") ? n.val() : void 0;
                            a.trigger("dislike-search-reason", {
                                value: t.val(),
                                message: e
                            }), a.hide(), i.show()
                        }()
                    })
                }
            })
        })
    }, app.requestHelpful = function (t) {
        app.findWithRoot(t, "[data-request-helpful]").each(function () {
            var t = $(this),
                e = t.find("[data-request-helpful-btn]"),
                a = t.find("[data-request-helpful-greeting]"),
                i = t.find("[data-reason]"),
                n = i.find("[data-reason-another-message]"),
                o = i.find('input[type="radio"].radio_another_reason');
            e.on("click", function (t) {
                t.preventDefault(), a.hide(), i.show(), o.on("change", function () {
                    n.focus()
                })
            });
            var r = a.find("[data-helpful-btn=yes]"),
                d = a.find("[data-helpful-btn=no]"),
                s = t.find("[data-request-helpful-answer=yes]"),
                l = t.find("[data-request-helpful-answer=no]");
            r.on("click", function (t) {
                t.preventDefault(), d.hasClass("_active") || s.show()
            }), d.on("click", function (t) {
                t.preventDefault(), r.hasClass("_active") || l.show()
            })
        })
    }, app.selectItem = function (t) {
        app.findWithRoot(t, ".select_item").on("change", function () {
            var t = this,
                e = $(t).parent().parent(),
                a = e.find("[data-item-select]"),
                i = t.options.selectedIndex;
            e.find(".chosen_list").toggleClass("chosen_list"), a.each(function () {
                t.options[i].value !== this.dataset.itemSelect || this.classList.add("chosen_list")
            })
        })
    }, app.versions = function (t) {
        app.findWithRoot(t, "[data-versions]").each(function () {
            var e = $(this),
                n = e.find("[data-versions-toggle]"),
                t = e.find("[data-versions-select]"),
                o = e.find("[data-versions-items]");
            o.filter("._active").length && t.val(o.filter("._active").data("versionsItems")), t.on("change", function () {
                var t = $(this).val();
                o.removeClass("_active").filter('[data-versions-items="' + t + '"]').addClass("_active"), i(), n.removeClass("_active"), o.filter("._active").addClass("_hidden")
            }), n.on("click", function () {
                $(this).toggleClass("_active"), o.filter("._active").toggleClass("_hidden")
            }), app.dom.$document.on("show-hidden", function (t) {
                $(t.target).has(e).length && i()
            }), i(), app.dom.$window.resize(i);
            var a = o.filter("._active").find("[data-versions-item]._active:eq(0)");

            function i() {
                var t = o.filter("._active"),
                    e = t.find("[data-versions-item]"),
                    a = t.width(),
                    i = 0;
                e.each(function () {
                    i += $(this).outerWidth(!0)
                }), parseInt(i) > parseInt(a) ? (n.show(), t.addClass("_hidden")) : (n.hide(), t.removeClass("_hidden"))
            }
            a.length && a.offset().top - 1 > a.parent().offset().top && (n.toggleClass("_active"), o.filter("._active").toggleClass("_hidden"))
        })
    }, app.imageSlider = function (t) {
        var e = app.findWithRoot(t, ".image-slider_base"),
            a = app.findWithRoot(t, ".image-slider_popup"),
            c = ($("[data-popup-open]"), !1);

        function i(t, e) {
            var a = t.find(".swiper-container"),
                i = t.find(".image-slider_pagination"),
                n = t.find(".image-slider_caption"),
                o = t.find(".image-slider_slide img"),
                r = t.find("._next"),
                d = t.find("._prev"),
                s = $("[data-popup-close]"),
                l = new Swiper(a, {
                    on: {
                        init: function () {
                            e ? n.text(o.eq(e).attr("alt") || "") : n.text(o.first().attr("alt"))
                        },
                        slideChange: function () {
                            n.text(o.eq(l.realIndex).attr("alt") || "")
                        }
                    },
                    observer: !0,
                    observeParents: !0,
                    observeSlideChildren: !0,
                    slidesPerView: 1,
                    spaceBetween: 40,
                    loop: !0,
                    effect: "fade",
                    preloadImages: !1,
                    initialSlide: e || 0,
                    lazy: {
                        loadOnTransitionStart: !0
                    },
                    pagination: {
                        el: i,
                        type: "custom",
                        renderCustom: function (t, e, a) {
                            return e + " / " + a
                        }
                    },
                    navigation: {
                        nextEl: r,
                        prevEl: d
                    }
                });
            c && s.on("click", function () {
                l.destroy(), c = !1
            })
        }
        e.each(function () {
            i($(this))
        }), a.each(function () {
            var e = $(this);
            $(document).on("click", "[data-popup-open]", function () {
                var t = $(this).data("swiper-slide-index");
                c = !0, i(e, t)
            })
        })
    }, app.materialsGall = function (t) {
        function c(t) {
            if (!t.length) return !1;
            var e = 0;
            t.css({
                "min-height": 0
            }), t.each(function () {
                currentHeight = $(this).innerHeight(), currentHeight > e && (e = currentHeight)
            }), t.css({
                "min-height": e
            })
        }
        app.findWithRoot(t, ".materials").each(function () {
            var t = $(this),
                e = t.find(".materials_gall"),
                a = t.find(".materials_nav"),
                i = a.find("._next"),
                n = a.find("._prev"),
                o = t.find(".swiper-slide");
            if (!o.length) return !1;
            o.length < 5 && a.hide();
            var r = 50,
                d = o.first(),
                s = t.data("spaceBetween");
            var l = new Swiper(e[0], {
                on: {
                    init: function () {
                        c(t.find(".material-external"))
                    }
                },
                slidesPerView: 4,
                spaceBetween: s || 50,
                navigation: {
                    nextEl: i,
                    prevEl: n
                },
                breakpoints: {
                    1023: {
                        slidesPerView: "auto",
                        spaceBetween: 16
                    }
                }
            });
            $(window).resize(function () {
                r = 1023 < app.dom.$window.width() ? s || d.outerWidth() / 5 || 50 : 16, slidesPerView = 1023 < app.dom.$window.width() ? 4 : "auto", l.params.spaceBetween = r, l.params.slidesPerView = slidesPerView, l.updateSlides(), c(t.find(".material-external"))
            })
        })
    }, app.homeBannersGall = function (t) {
        var e = app.findWithRoot(t, "[data-home-banners-gall]");
        new Swiper(e[0], {
            slidesPerView: "auto",
            spaceBetween: 16
        })
    }, app.bannersGall = function (t) {
        app.findWithRoot(t, "[data-banners-gall]").each(function () {
            var t = $(this);
            t.find(".swiper-slide"), new Swiper(t[0], {
                slidesPerView: "auto",
                spaceBetween: 16
            })
        })
    }, app.homeContentAnimation = function (t) {
        var a = 400,
            i = 150,
            n = app.findWithRoot(t, ".home-content");
        if (!n.length) return !1;
        var e, o = app.findWithRoot(t, ".home-header_shadow");

        function r() {
            var t = $(document).scrollTop();
            t <= 6 * a && d(t)
        }

        function d(t) {
            var e = Math.min(t / a, 1) * i - 150;
            n.css({
                transform: e ? "translate(0," + e + "px)" : ""
            }), o.css({
                "box-shadow": "0px " + a + "px 0px " + a + "px rgba(0,0,0," + (1 - Math.min(t / a, 1)) + ")"
            })
        }
        setTimeout(function () {
            d($(document).scrollTop())
        }), app.dom.$window.scroll(function () {
            r(), clearTimeout(e), e = setTimeout(r, 500)
        })
    }, app.homeHeaderGall = function (t) {
        var e = app.findWithRoot(t, ".home-header"),
            a = app.findWithRoot(t, ".home-header_gall");
        if (!a.length) return !1;
        var i = app.findWithRoot(t, ".home-header_nav_btns"),
            n = i.find("._next"),
            o = i.find("._prev"),
            r = app.findWithRoot(t, ".home-header_nav_progress_bar"),
            d = app.findWithRoot(t, "[data-home-search]"),
            s = app.findWithRoot(t, ".home-header_search_inp"),
            l = 5e3,
            c = null,
            p = 0,
            f = !1,
            h = a.hasClass("_no-autoplay"),
            u = app.findWithRoot(t, ".home-header_main._desktop .swiper-slide"),
            g = "";
        if (h && r.parent().addClass("hidden-content"), u.each(function () {
                g = g + '<div class="swiper-slide">\n  <div class="home-header_gall_slide" style="background-image:url(' + $(this).data("backgroundImage") + ');"></div>\n            </div>'
            }), $('<div class="home-header_gall_wrap">\n        <div class="swiper-container home-header_photo_gall">\n          <div class="swiper-wrapper">\n' + g + "          </div>\n        </div>\n      </div>").prependTo(".home-header"), u.length < 2) return e.addClass("_one-slide"), !1;
        var m = new Swiper(app.findWithRoot(t, ".home-header_photo_gall")[0], {
            slidesPerView: 1,
            initialSlide: 0,
            loop: !0
        });
        d.css("opacity", 0);
        var v = !0,
            _ = new Swiper(a[0], {
                slidesPerView: 1,
                loop: !0,
                effect: "fade",
                initialSlide: 0,
                simulateTouch: !1,
                autoplay: !h && {
                    delay: l,
                    disableOnInteraction: !1
                },
                on: {
                    progress: b,
                    slideChange: function () {
                        if (_) {
                            var t = 0 === _.realIndex;
                            t !== v && (t || d.removeClass("_hide"), d.animate({
                                opacity: t ? 0 : 1
                            }, 150, function () {
                                t && d.addClass("_hide")
                            }), v = t), m.slideTo(_.realIndex + 1)
                        }
                    }
                },
                navigation: {
                    nextEl: n,
                    prevEl: o
                },
                pagination: {
                    el: ".home-header_nav_pag",
                    type: "custom",
                    renderCustom: function (t, e, a) {
                        return e + " / " + a
                    }
                }
            });

        function b() {
            if (f) return !1;
            clearInterval(c), p = 0, c = setInterval(function () {
                p = Math.min(p + 1, 100), r.css({
                    width: p + "%"
                })
            }, l / 100)
        }

        function k() {
            f = !0, _.autoplay.stop(), clearInterval(c), r.css({
                width: 0
            })
        }
        a.on("mouseover", ".home-header_nav_btns", k), a.on("mouseout", ".home-header_nav_btns", k), a.on("focus", ".home-header_search_inp", k), a.on("blur", ".home-header_search_inp", function () {
            s.val() || (f = !1, _.autoplay.start(), b())
        })
    },
    app.homeHeaderGall = function (t) {
        var e = app.findWithRoot(t, ".home-header"),
            a = app.findWithRoot(t, ".home-header_gall");
        if (!a.length) return !1;
        var i = app.findWithRoot(t, ".home-header_nav_btns"),
            n = i.find("._next"),
            o = i.find("._prev"),
            r = app.findWithRoot(t, ".home-header_nav_progress_bar"),
            d = app.findWithRoot(t, "[data-home-search]"),
            s = app.findWithRoot(t, ".home-header_search_inp"),
            l = 5e3,
            c = null,
            p = 0,
            f = !1,
            h = a.hasClass("_no-autoplay"),
            u = app.findWithRoot(t, ".home-header_main._desktop .swiper-slide"),
            g = "";
        if (h && r.parent().addClass("hidden-content"), u.each(function (index) {
            var imagePath1 = "images/unsplash_3fPXt37X6UQ.png";
                var imagePath2 = "images/heading-img-1.jpg";
                var imagePath3 = "images/heading-img-2.jpg";
                var imagePath4 = "images/heading-img-3.jpg";
                
                var currentImagePath;
                if (index === 0) {
                    currentImagePath = imagePath1;
                } else if (index === 1) {
                    currentImagePath = imagePath2;
                } else if (index === 2) {
                    currentImagePath = imagePath3;
                } else if (index === 3) {
                    currentImagePath = imagePath4;
                }

                g += '<div class="swiper-slide">\n  <div class="home-header_gall_slide" style="background-image:url(' + currentImagePath + ');"></div>\n</div>';
            }), $('<div class="home-header_gall_wrap">\n        <div class="swiper-container home-header_photo_gall">\n          <div class="swiper-wrapper">\n' + g + "          </div>\n        </div>\n      </div>").prependTo(".home-header"), u.length < 2) return e.addClass("_one-slide"), !1;
        var m = new Swiper(app.findWithRoot(t, ".home-header_photo_gall")[0], {
            slidesPerView: 1,
            initialSlide: 0,
            loop: !0
        });
        d.css("opacity", 0);
        var v = !0,
            _ = new Swiper(a[0], {
                slidesPerView: 1,
                loop: !0,
                effect: "fade",
                initialSlide: 0,
                simulateTouch: !1,
                autoplay: !h && {
                    delay: l,
                    disableOnInteraction: !1
                },
                on: {
                    progress: b,
                    slideChange: function () {
                        if (_) {
                            var t = 0 === _.realIndex;
                            t !== v && (t || d.removeClass("_hide"), d.animate({
                                opacity: t ? 0 : 1
                            }, 150, function () {
                                t && d.addClass("_hide")
                            }), v = t), m.slideTo(_.realIndex + 1)
                        }
                    }
                },
                navigation: {
                    nextEl: n,
                    prevEl: o
                },
                pagination: {
                    el: ".home-header_nav_pag",
                    type: "custom",
                    renderCustom: function (t, e, a) {
                        return e + " / " + a
                    }
                }
            });

        function b() {
            if (f) return !1;
            clearInterval(c), p = 0, c = setInterval(function () {
                p = Math.min(p + 1, 100), r.css({
                    width: p + "%"
                })
            }, l / 100)
        }

        function k() {
            f = !0, _.autoplay.stop(), clearInterval(c), r.css({
                width: 0
            })
        }
        a.on("mouseover", ".home-header_nav_btns", k), a.on("mouseout", ".home-header_nav_btns", k), a.on("focus", ".home-header_search_inp", k), a.on("blur", ".home-header_search_inp", function () {
            s.val() || (f = !1, _.autoplay.start(), b())
        })
    },
    app.homeHeaderGallMobile = function (t) {
        var e = app.findWithRoot(t, ".home-header"),
            a = app.findWithRoot(t, ".home-header_gall_mobile"),
            i = null,
            n = 0,
            o = a.hasClass("_no-autoplay"),
            r = null,
            d = a.find(".swiper-pagination"),
            s = app.findWithRoot(t, ".home-header_main._mobile .swiper-slide"),
            l = "";
        if (0 === s.length) return e.addClass("_no-mobile-slider"), !1;
        if (s.each(function (index) {
            var imagePath1 = "images/unsplash_3fPXt37X6UQ.png";
                var imagePath2 = "images/heading-img-1.jpg";
                var imagePath3 = "images/heading-img-2.jpg";
                var imagePath4 = "images/heading-img-3.jpg";
                
                var currentImagePath;
                if (index === 0) {
                    currentImagePath = imagePath1;
                } else if (index === 1) {
                    currentImagePath = imagePath2;
                } else if (index === 2) {
                    currentImagePath = imagePath3;
                } else if (index === 3) {
                    currentImagePath = imagePath4;
                }

                l += '<div class="swiper-slide">\n  <div class="home-header_gall_slide" style="background-image:url(' + currentImagePath + ');"></div>\n</div>';
            }), $('<div class="home-header_gall_wrap _mobile">\n        <div class="swiper-container home-header_photo_gall _mobile">\n          <div class="swiper-wrapper">\n' + l + "          </div>\n        </div>\n      </div>").prependTo(".home-header"), 1 === s.length) return e.addClass("_one-slide-mobile"), !1;
        var c = new Swiper(app.findWithRoot(t, ".home-header_photo_gall._mobile")[0], {
                slidesPerView: 1,
                loop: !0
            }),
            p = new Swiper(a[0], {
                slidesPerView: 1,
                loop: !0,
                effect: "fade",
                autoplay: !o && {
                    delay: 5e3,
                    disableOnInteraction: !1
                },
                on: {
                    slideChange: function () {
                        p && (c.slideTo(p.realIndex + 1), r && a.find(".swiper-pagination-bullet-active").append(r))
                    },
                    progress: f,
                    init: function () {
                        setTimeout(function () {
                            r = $('<span class="pagination-progress" />'), a.find(".swiper-pagination-bullet-active").append(r), f(), o && d.addClass("_noProgress")
                        }, 200)
                    }
                },
                pagination: {
                    el: d
                }
            });

        function f() {
            if (!r) return !1;
            clearInterval(i), n = 0, i = setInterval(function () {
                n = Math.min(n + 1, 100), r.css({
                    width: n + "%"
                })
            }, 50)
        }
    };

app.openAnchor = function (t) {
    if (app.findWithRoot(t, 'a[href *= "#"]').not('[href $= "#"]').on("click", function (t) {
            var e = $(this).attr("href").replace(/^[^#]*/, ""),
                a = $(e);
            a.length && a.trigger("open-anchor", [!0])
        }), app.dom.$document.on("open-anchor", function (t, e) {
            if (e) {
                var a = $(t.target);
                $("html, body").animate({
                    scrollTop: a.offset().top - app.dom.$window.height() / 2
                }, 500)
            }
        }), location.hash && location.hash.match(/^#[a-z][0-9-_:\.a-z]*$/gim)) {
        var e = $(location.hash);
        e.length && setTimeout(function () {
            e.trigger("open-anchor", [!0])
        }, 500)
    }
}, app.rouble = function (t) {
    app.findWithRoot(t, ".ruble_download_buffer_link").on("click", function (t) {
        t.preventDefault(),
            function (t) {
                var e = $("<input>");
                $("body").append(e), e.val($(t).text()).select(), document.execCommand("copy"), e.remove()
            }(".ruble_symbol")
    })
}, app.searchForm = function (e) {
    var a = app.findWithRoot(e, "[data-search-form]"),
        t = a.find("[data-search-form-input]"),
        i = a.find("[data-search-form-btn]"),
        n = app.findWithRoot(e, "[data-search-form-show]"),
        o = !1;
    $.trim(t.val()) || i.prop("disabled", !0), t.keyup(function () {
        o = !$.trim(t.val()), i.prop("disabled", o)
    }), n.on("click", function (t) {
        t.preventDefault(), app.dom.$body.addClass("blackout"), app.findWithRoot(e, "[data-menu-close]").trigger("click"), a.show()
    }), app.dom.$document.click(function (t) {
        !a.is(":visible") || $(t.target).closest(a).length || $(t.target).closest(n).length || (app.dom.$body.removeClass("blackout"), a.hide())
    })
}, app.textareaCounter = function (t) {
    app.findWithRoot(t, "textarea[maxlength], textarea[data-maxlength], textarea[data-val-maxlength-max]").each(function () {
        var e = $(this),
            a = parseInt(e.attr("maxlength") || e.data("maxlength") || e.data("val-maxlength-max"), 10),
            i = e.val().replace(/\n/g, "\r\n").length;
        e.removeAttr("maxlength");
        var t = a - i,
            n = $('<div class="textarea_counter">' + app.l10n.textarea.charsLeft + " " + t.toLocaleString(app.l10n.locales) + "</div>");

        function o() {
            var t = 0;
            (i = e.val().replace(/\n/g, "\r\n").length) <= a ? (t = a - i, n.text(app.l10n.textarea.charsLeft + " " + t.toLocaleString(app.l10n.locales))) : (t = i - a, n.text(app.l10n.textarea.extraChars + " " + t.toLocaleString(app.l10n.locales)))
        }
        n.insertAfter(e), o(), e.on("input", o), e.on("input-hook", o), e.on("change", function () {
            e.trigger("filter-select")
        })
    })
}, app.addField = function (t) {
    var i = app.findWithRoot(t, "[data-add-field]");
    i.each(function () {
        var t = $(this),
            e = t.find("[data-add-field-items]"),
            a = t.find("[data-add-field-template]");
        t.find("[data-add-field-btn]").on("click", function (t) {
            t.preventDefault(), a.clone().attr("data-text-input", "").appendTo(e).removeAttr("data-add-field-template").trigger("new-html")
        }), i.on("click", "[data-add-field-delete]", function () {
            $(this).closest(".add-field_template").remove()
        })
    })
}, app.export = function (t) {
    var a = app.findWithRoot(t, ".b-export");
    app.findWithRoot(t, "button.b-export_button").on("click", function (t) {
        t.preventDefault();
        var e = $(this).closest(a);
        e.toggleClass("_open"), e.hasClass("_open") && (e.offset().left + e.width() / 2 > app.dom.$window.width() / 2 ? e.addClass("_right") : e.removeClass("_right"))
    }), $(document).click(function (t) {
        a.each(function () {
            0 === $(this).has(t.target).length && $(this).removeClass("_open")
        })
    })
}, app.imageZoom = function (t) {
    OpenSeadragon($.extend({
        id: "imageZoom",
        prefixUrl: "/common/images/openseadragon/",
        autoHideControls: !1,
        showFullPageControl: !1,
        minZoomImageRatio: .1
    }, t))
}, app.AddItemInMenu = function (t) {
    var e = app.findWithRoot(t, ".dropdownBtnBlock"),
        a = e.find(".dropdownBtn"),
        i = e.find(".dropdown-close");
    a.on("click", function () {
        $(this).siblings(".dropdown-content").toggle("show")
    }), i.on("click", function () {
        $(this).parent(".dropdown-content").toggle("show")
    })
}, app.tabsWidthCheckingUnit = function (t) {
    function e() {
        var t = r.getBoundingClientRect().left + l.getBoundingClientRect().left,
            e = r.getBoundingClientRect().right + l.getBoundingClientRect().right,
            a = r.getBoundingClientRect().left + c.getBoundingClientRect().left,
            i = r.getBoundingClientRect().right + c.getBoundingClientRect().right,
            n = (window.pageYOffset, window.pageXOffset + document.documentElement.clientWidth),
            o = window.pageXOffset + document.documentElement.clientWidth;
        window.pageYOffset, document.documentElement.clientHeight, n < e && t < o ? s.hide() : s.show(), n < i && a < o ? d.hide() : d.show()
    }
    var r = document.querySelector(".tabs"),
        d = app.findWithRoot(t, ".tabs_filters_wrap .arrow__left"),
        s = app.findWithRoot(t, ".tabs_filters_wrap .arrow__right"),
        a = $(".tabs"),
        l = a.children().get(-1),
        c = a.children().get(0);
    null != r && (r.addEventListener("scroll", function (t) {
        e()
    }), e())
}, app.accordionTable = function (t) {
    var e = app.findWithRoot(t, "[data-accordion-table]");
    $accordion_head = e.find("[data-accordion-head]"), $accordion_content = e.find("[data-accordion-content]"), $accordion_head.on("click", function () {
        $accordion_content.hasClass("_active") ? $accordion_content.removeClass("_active").attr("aria-expanded", "false").hide() : $accordion_content.addClass("_active").attr("aria-expanded", "true").show()
    })
}, app.dropDownRow = function (t) {
    var e = app.findWithRoot(t, "[data-show-row]");
    app.findWithRoot(t, "[data-dropdown-row]");
    e.each(function (t, i) {
        $(i).on("click", function (t) {
            $(i).toggleClass("active");
            var e = i.getAttribute("data-show-row"),
                a = $("[data-dropdown-row=" + e + "]");
            a.each(function (t, e) {
                a.length - 1 === t && $(a[t]).addClass("row_border")
            }), a.toggleClass("row_show")
        })
    })
}, app.hidingContentTable = function (t) {
    app.findWithRoot(t, ".tr-content").each(function (t, a) {
        $(a).on("click", function (t) {
            ($(a).find(".tr-content__hiding").length ? $(a).find(".tr-content__hiding") : $(a).find(".tr-content__disclosure")).each(function (t, e) {
                $(e).hasClass("tr-content__hiding") ? ($(e).removeClass("tr-content__hiding"), $(e).addClass("tr-content__disclosure"), $(a).find(".arrow-table__down").addClass("js-up")) : $(e).hasClass("tr-content__disclosure") && ($(e).addClass("tr-content__hiding"), $(e).removeClass("tr-content__disclosure"), $(a).find(".arrow-table__down").removeClass("js-up"))
            })
        })
    })
}, app.clickOnHref = function (t) {
    var e = app.findWithRoot(t, "[data-open-href]"),
        a = app.findWithRoot(t, "[data-region-href]"),
        i = app.findWithRoot(t, "[data-home-href]");
    e.attr("data-open-href") && e.each(function (t, e) {
        $(e).on("click", function () {
            window.open(e.dataset.openHref)
        })
    }), a.attr("data-region-href") && a.each(function (t, e) {
        $(e).on("click", function () {
            window.open(e.dataset.regionHref, "_self")
        })
    }), i.attr("data-home-href") && i.each(function (t, e) {
        $(e).on("click", function () {
            window.open(e.dataset.homeHref, "_self")
        })
    })
};