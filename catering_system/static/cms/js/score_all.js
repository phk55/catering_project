function get_data(month_lis, menu_lis, cur_month, cur_menu_id) {
    if (cur_menu_id === 0) {
        for (i = 0; i < menu_lis.length; i++) {
            if (menu_lis[i].classList.contains('active') === true) {
                cur_menu_id = menu_lis[i].value

            }
        }
    }
    if (cur_month === 0) {
        for (i = 0; i < month_lis.length; i++) {
            if (month_lis[i].classList.contains('active') === true) {
                cur_month = month_lis[i].innerHTML
            }
        }
    }
    // console.log(cur_month, 'month')
    // console.log(cur_menu_id, 'menu')
    myajax.post({
        'url': '/cms/scoredata/',
        'data': {
            'cur_month': cur_month,
            'cur_menu_id': cur_menu_id
        },
        'success': function (data) {
            if (data['code'] === 200) {
                function scoretable(data) {
                    var score_data = data['data']['score_data']
                    var chef_data = data['data']['chef_name']

                    // console.log(data['data'])
                    // console.log(Object.keys(score_data))
                    var table = document.getElementById('score_table')
                    var old_tb = document.getElementById('tb')
                    old_tb.remove()
                    var tb = document.createElement('tbody')
                    tb.id = 'tb'
                    table.appendChild(tb)

                    var score_data_keys = Object.keys(score_data)
                    for (var i = 0; i < score_data_keys.length; i++) {
                        var tr = document.createElement('tr')
                        var td1 = document.createElement('td')
                        td1.innerText = i + 1
                        var td2 = document.createElement('td')
                        td2.innerText = score_data[i]['score1']
                        var td3 = document.createElement('td')
                        td3.innerText = score_data[i]['score2']
                        var td4 = document.createElement('td')
                        td4.innerText = score_data[i]['score3']
                        var td5 = document.createElement('td')
                        td5.innerText = score_data[i]['suggest']

                        var td6 = document.createElement('td')
                        td6.innerText = score_data[i]['create_time']
                        tr.appendChild(td1)
                        tr.appendChild(td2)
                        tr.appendChild(td3)
                        tr.appendChild(td4)
                        tr.appendChild(td5)
                        tr.appendChild(td6)
                        tb.appendChild(tr)
                    }


                    var chef_div = document.getElementById('chef_div')
                    var old_user_div = document.getElementById('user_div')
                    old_user_div.remove()
                    var user_div = document.createElement('div')
                    user_div.id = 'user_div'
                    chef_div.appendChild(user_div)

                    for (var j = 0; j < chef_data.length; j++) {
                        var span = document.createElement('span')
                        span.innerText = chef_data[j]
                        user_div.appendChild(span)
                    }
                }

                function scorepie(data) {

                    var dom = document.getElementById("proportion");
                    var myChart = echarts.init(dom);
                    var app = {};
                    option = null;
                    option = {
                        title: {
                            text: '评分分布图',

                            left: 'center',
                            top: '2%',
                            textStyle: {
                                fontSize: 13,
                                color: "rgb(137,137,137)"
                            },
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a}<br/>{b}分 : {c} ({d}%)',

                        },
                        legend: {
                            left: 'left',
                            orient: 'vertical',
                            top: '20%',
                            data: ['1', '2', '3', '4', '5'],
                            icon: "circle"
                        },
                        toolbox: {
                            show: true,
                            // feature: {
                            //     mark: {show: true},
                            //     dataView: {show: true, readOnly: false},
                            //     magicType: {
                            //         show: true,
                            //         type: ['pie', 'funnel']
                            //     },
                            //     restore: {show: true},
                            //     saveAsImage: {show: true}
                            // }
                        },
                        series: [
                            {
                                name: '评分',
                                type: 'pie',
                                radius: [20, 65],
                                center: ['65%', '50%'],
                                roseType: 'area',
                                label: {
                                    show: false
                                },
                                // data: [
                                //     {value: 10, name: '1'},
                                //     {value: 5, name: '2'},
                                //     {value: 15, name: '3'},
                                //     {value: 25, name: '4'},
                                //     {value: 20, name: '5'},
                                //
                                // ]
                                data: data['data']['score_count']
                            }
                        ]
                    };
                    ;
                    if (option && typeof option === "object") {
                        myChart.setOption(option, true);
                    }
                }

                function scoreline(data) {
                    var dom = document.getElementById("detail_num");
                    var myChart = echarts.init(dom);
                    var app = {};
                    option5 = null;
                    // var date = ['2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06', '2018/07', ' 2018/08', '2018/09', '2018/10', '2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06', '2018/07', ' 2018/08', '2018/09', '2018/10', '2018/01', '2018/02', '2018/03', '2018/04', '2018/05', '2018/06', '2018/07', ' 2018/08', '2018/09', '2018/10']
                    // var data2 = [12, 22, 55, 252, 77, 72, 88, 88, 111, 199, 12, 22, 55, 252, 77, 72, 88, 88, 111, 199, 12, 22, 55, 252, 77, 72, 88, 88, 111, 199]
                    //
                    var date = data['data']['days'];
                    var data2 = data['data']['count_num'];
                    option5 = {
                        tooltip: {
                            trigger: 'axis',
                            position: function (pt) {
                                return [pt[0], '10%'];
                            }
                        },
                        title: {
                            left: 'center',
                            text: '每日评分统计',
                            top: 10,
                            textStyle: {
                                fontSize: 13,
                                color: "rgb(137,137,137)"
                            },

                        },
                        toolbox: {
                            feature: {
                                // dataZoom: {
                                //     yAxisIndex: 'none'
                                // },
                                restore: {},
                                // saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: true,//设置为true则为不从原点开始，有点距离，否则从0开始
                            data: date,
                            axisLabel: {
                                color: "rgb(137,137,137)"
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgb(137,137,137)"
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, '100%'],

                            min: 0,
                            max: function (value) {
                                var a = (parseInt(value.max / 10) + 1) * 10
                                return a;
                            },
                            axisLabel: {
                                color: "rgb(137,137,137)"
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgb(137,137,137)"
                                }
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside',
                                start: 0,
                                end: 100
                            }, {
                                start: 50,
                                end: 100,
                                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                handleSize: '80%',
                                handleStyle: {
                                    color: '#979797',
                                    shadowBlur: 3,
                                    shadowColor: 'rgba(255,255,255,0.6)',
                                    shadowOffsetX: 2,
                                    shadowOffsetY: 2
                                },
                                textStyle: {//控制滑动时显示字体颜色
                                    color: "rgb(137,137,137)"
                                },

                            }],
                        series: [
                            {
                                name: '评分量',
                                type: 'line',
                                smooth: true,
                                // symbol: 'none',
                                sampling: 'average',


                                itemStyle: {
                                    color: 'rgb(255, 70, 131)',

                                },
                                // 显示折点数值
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '#616161'
                                        }
                                    }
                                },

                                areaStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(255, 158, 68)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(255, 70, 131)'
                                    }]),
                                },
                                data: data2,

                                // 设置平均值
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ],
                                    lineStyle: {
                                        color: "rgb(0,97,135)"
                                    }
                                }

                            }
                        ]
                    };


                    ;
                    if (option5 && typeof option5 === "object") {
                        myChart.setOption(option5, true);
                    }
                }


                scoretable(data)
                scorepie(data)
                scoreline(data)

            } else {
                myalert.alertInfo('信息有误！')
            }


        }
    })

}

$(function () {


    var month_lis = document.getElementsByClassName('month-li')
    var menu_lis = document.getElementsByClassName('menu-li')


    for (i = 0; i < month_lis.length; i++) {
        if (month_lis[i].classList.contains('active') === true) {
            var cur_month = month_lis[i].innerHTML
        }
    }
    for (i = 0; i < menu_lis.length; i++) {
        if (menu_lis[i].classList.contains('active') === true) {
            var cur_menu_id = menu_lis[i].value

        }
    }
    get_data(month_lis, menu_lis, cur_month, cur_menu_id)

    for (i = 0; i < month_lis.length; i++) {
        month_lis[i].onclick = function () {
            for (i = 0; i < month_lis.length; i++) {
                if (month_lis[i].classList.contains('active') === true) {
                    month_lis[i].classList.remove('active')
                }
            }
            this.classList.add('active')
            var cur_month = this.innerHTML
            get_data(month_lis, menu_lis, cur_month, 0)
        }
    }

    for (i = 0; i < menu_lis.length; i++) {
        menu_lis[i].onclick = function () {
            for (i = 0; i < menu_lis.length; i++) {
                if (menu_lis[i].classList.contains('active') === true) {
                    menu_lis[i].classList.remove('active')

                }
            }
            this.classList.add('active')
            var cur_menu_id = this.value
            get_data(month_lis, menu_lis, 0, cur_menu_id)
        }
    }


})

