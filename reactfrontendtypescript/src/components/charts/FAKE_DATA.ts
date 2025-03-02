export const lineChartData={

    labels:[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    datasets:[
        {   fill:true,
            label: "Steps A",
            data:[3000,5000,4500,6000,8000,7000,9000],
            borderColor: "rgb(75, 192,192)",
            backgroundColor:"rgba(110, 75, 192, 0.29)"

        },
        { fill:true,
            label: "Steps B",
            data:[3000,5000,5500,3000,6000,6500,8000],
            borderColor: "rgb(192, 89, 75)",
            backgroundColor:"rgba(250,104,104,0.29)"
        },
    ],
}

export const barChartData={

    labels:[
        "Rent",
        "Groceries",
        "Utilities",
        "Entertainment",
        "Transportation",

    ],
    datasets:[
        {
            label: "Expenses",
            data:[1200,500,450,600,800],
            backgroundColor:["rgba(110, 75, 192, 0.29)",
                "rgba(192, 75, 176, 0.29)",
                "rgba(192, 184, 75, 0.29)",
                "rgba(75, 188, 192, 0.29)",
                "rgba(112, 192, 75, 0.29)"
            ],
            borderColor: "rgb(178, 75, 192)",
            borderWidth:1,

        },

    ],
}
export const pieChartData={

    labels:[
        "Facebook",
        "Instagram",
        "Twitter",
        "YouTube",
        "LinkedIn",

    ],
    datasets:[
        {
            label: "Time Spent",
            data:[120,50,450,60,80],
            backgroundColor:["rgba(110, 75, 192, 0.29)",
                "rgba(192, 75, 176, 0.29)",
                "rgba(192, 184, 75, 0.29)",
                "rgba(75, 188, 192, 0.29)",
                "rgba(112, 192, 75, 0.29)"
            ],
            hoverOffset: 4

        },

    ],
}