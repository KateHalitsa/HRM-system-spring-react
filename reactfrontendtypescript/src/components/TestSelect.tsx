import React from "react";
import AsyncSelect from 'react-select/async';
import {Col, Label} from "reactstrap";
import accessServerAPI from "../model/AccessServerAPI";
import {Employee} from "../model/employee.model";

const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
) => {
    accessServerAPI.employees.find(inputValue).then(
        employeeList => {
            const userOptions = employeeList.map((employee: Employee ) => ({
                value: employee.id,
                label: employee.lastName + " " + employee.firstName
            }));
            callback(userOptions);
        }
    )
};

export const MyComponent = () => {

    return (
        <label className="row small mb-1"> <div className="col-2 text-end pe-0" >Сотрудник</div>
        <Col sm="10" className="text-start">
            {/*<Select options={options} id="aaa" name="aaa"/>*/}
            <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions/>
        </Col>
        </label>
    )
}

/*

value = {{value: 1, label: "black"}}

    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const employeeList = await accessServerAPI.employees.list();
                const userOptions = employeeList.map((employee: Employee ) => ({
                    value: employee.id, // using user's ID as the value
                    label: employee.firstName + " " + employee.lastName // using user's name as the label
                }));
                setOptions(userOptions as any);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchOptions();
    }, []);
            <Select options={options} id="aaa" styles = {{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'grey' : 'blue',
                    marginTop: 0,
                    paddingTop: 0,
                    height:10
                }),
            }}/>

 */

