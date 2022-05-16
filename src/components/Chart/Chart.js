import React from 'react'
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
    ResponsiveContainer,
} from 'recharts';
import classes from './Chart.module.css'

const Chart = ({ data }) => {
    const chartdata = data && data.map(el => {
        return {
            name: `شهر ${el._id}`,
            الدخل: el.totalIncom,
        }
    })


    return (
        <div className={classes.Chart}>
            <h2>
                تقرير الدخل لهذا العام
            </h2>

            <ResponsiveContainer className={classes.Rchart} width="100%" height={500} >
                <BarChart
                    width={500}
                    height={300}
                    data={chartdata}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                        dx={-50}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{
                            backgroundColor: '#444',
                            borderRadius: 5,
                            color: '#ccc'
                        }} />
                    <Bar dataKey="الدخل"
                        fill="#8884d8"
                        barSize={30}
                        colorInterpolation={'red'}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart


