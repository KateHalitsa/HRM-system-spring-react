import React, {Component} from "react";
import AsyncSelect from 'react-select/async';
import {Col, Label} from "reactstrap";
import accessServerAPI from "../model/AccessServerAPI";
import {EmployeePosition} from "../model/EmployeePosition.model";
import {LookupItem} from "../model/LookupItem.model";

const loadOptionsPosition = (
    inputValue: string,
    callback: (options: any) => void
) => {
    accessServerAPI.positions.find(inputValue).then(
        employeePositionList => {
            const positionOptions = employeePositionList.map((position: EmployeePosition ) => ({
                value: position.id,
                label: position.id
            }));
            callback(positionOptions);
        }
    )
};

export const MyComponentPosition = () => {

    return (
        <label className="row small mb-1"> <div className="col-2 text-end pe-0" >Професия</div>
            <Col sm="10" className="text-start">
                <AsyncSelect cacheOptions loadOptions={loadOptionsPosition} defaultOptions/>
            </Col>
        </label>
    )
}

interface ILookupSelectorProps {
    label: string;
    lookupObjectId: number;
    findFunction: (inputValue: string) => Promise<LookupItem[]>;
    loadFunction: (id: number) => Promise<LookupItem>;
    onChange: (newId: number) => void;
    enabled?: boolean | undefined;
}
interface ILookupSelectorState {
    curLookupItem: LookupItem;
}
export class LookupSelector extends Component<ILookupSelectorProps, ILookupSelectorState>{

    constructor(props: ILookupSelectorProps) {
        super(props);
        this.state = {
            curLookupItem: new LookupItem()
        }
        this.LoadCurrentLookupItem = this.LoadCurrentLookupItem.bind(this);
    }

    componentDidMount() {
        this.LoadCurrentLookupItem();
    }
    componentDidUpdate(prevProps: ILookupSelectorProps, prevState: ILookupSelectorState){
        if (prevProps.lookupObjectId !== this.props.lookupObjectId){
            this.LoadCurrentLookupItem();
        }
    }

    LoadCurrentLookupItem(){
        const lookupObjectId = this.props.lookupObjectId;
        const lookupItem = this.state.curLookupItem;
        if (lookupItem.value !== lookupObjectId) {
            if (lookupObjectId > 0) {
                this.props.loadFunction(lookupObjectId)
                    .then(
                        foundLookupItem => this.setState({...this.state, curLookupItem: foundLookupItem})
                    )
            } else {
                this.setState({...this.state, curLookupItem: new LookupItem()})
            }
        }
    }


    render(){

        let enabled: boolean = true;
        if (this.props.enabled !== undefined) {
            enabled = this.props.enabled;
        }

        if (!enabled) {
            const lookupItem = this.state.curLookupItem;
            return (
                <label className="row small mb-1">
                    <div className="col-2 text-end pe-0">Сотрудник</div>
                    <Col sm="10" className="text-start">
                        <Label>{lookupItem.label}</Label>
                    </Col>
                </label>
            )

        } else {

            const onChangeSelectedOption = (lookupItem: LookupItem | LookupItem[] | null) => {
                if (!Array.isArray(lookupItem)) {
                    if (lookupItem === null){
                        lookupItem = new LookupItem();
                    }
                    this.setState({...this.state, curLookupItem: lookupItem})
                    this.props.onChange(lookupItem.value);
                }
            }

            let value = this.state.curLookupItem;

            return (
                <label className="row small mb-1">
                    <div className="col-2 text-end pe-0" style={{display: "flex", alignItems: "center", justifyContent: "right"}}>{this.props.label}</div>
                    <Col sm="10" className="text-start">
                        <AsyncSelect cacheOptions defaultOptions isClearable
                                     loadOptions={this.props.findFunction}
                                     value={value}
                                     onChange={(lookupItem) => onChangeSelectedOption(lookupItem)}
                        />
                    </Col>
                </label>
            )
        }

    }

}
