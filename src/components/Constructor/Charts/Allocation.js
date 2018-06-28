import React, {Component} from 'react';
import {BarChart, Bar, XAxis, LabelList} from 'recharts';

class Allocation extends Component {
    constructor(props) {
        super(props);

        const {
            weightingDerivatives,
            weightingStocks,
            weightingBonds,
            weightingOther
        } = props.dataChart;

        this.state = {
            ...props.dataChart,
            weightingDerivatives,
            weightingStocks,
            weightingBonds,
            weightingOther
        };
        this.updateWidth = this.updateWidth.bind(this);
        
    }
    
    // React lifecycle
    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
    };
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }
    
    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }
    
    render(){
        
        let {windowWidth, weightingDerivatives, weightingStocks, weightingBonds, weightingOther} = this.state;
    
        windowWidth = windowWidth || window.innerWidth;

        const isIPad = windowWidth <= 1024;
        
        const data = [
            {name: 'Derivate', uv: weightingDerivatives, up: `${weightingDerivatives}%`},
            {name: 'Aktien', uv: weightingStocks, up: `${weightingStocks}%`},
            {name: 'Anleihen', uv: weightingBonds, up: `${weightingBonds}%`},
            {name: 'Alternative', uv: weightingOther, up: `${weightingOther}%`},
        ];
    
        return (
            <BarChart
                width={isIPad ? 280 : 340}
                height={200}
                data={data}
                barSize={25}
                barGap={1}
                margin={{ top: 15, right: 0, left: 0, bottom: 5 }}>
                <XAxis dataKey="name" tick={{fontSize: 12}} interval={0}/>
                <Bar dataKey="uv" fill="#f76b1c">
                    <LabelList dataKey="up" position="top" />
                </Bar>
            </BarChart>
        )
        
    };
}

export default Allocation;