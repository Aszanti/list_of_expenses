import React from 'react';
import styled from '@emotion/styled';

const Content = styled.div`
    width: 600px;
    margin: 0 auto;
`
const Header = styled.div`
    height: 50px;
    margin: 35px 0;
`
const InputRate = styled.input`
    font-size: 16px;
    width: 80px;
    display: block;
    float: left;
    margin: 5px;
    outline: none;
    padding-left: 5px;
    height: 20px;
`
const LabelRate = styled.label`
    font-size: 18px;
    width: 65px;
    display: block;
    float: left;
    margin: 5px;
    line-height: 25px;
`
const Span = styled.span`
    font-size: 35px;
    width: 300px;
    float: left;
`
const Rate = styled.div`
    font-size: 18px;
    float: right;
    margin-top: 10px;
`
const Input = styled.input`
    font-size: 16px;
    width: 295px;
    display: block;
    float: left;
    margin: 10px 5px;
    outline: none;
    padding-left: 5px;
    height: 30px;
`
const Label = styled.label`
    font-size: 18px;
    width: 150px;
    display: block;
    float: left;
    margin: 10px 5px;
    line-height: 35px;
`
const Button = styled.button`
    padding: 10px 30px;
    background-color: #19b58e;
    border-color: #19b58e;
    font-size: 18px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    outline: none;
    margin: 38px 13px;
    &:hover {
        background-color: #1ccea2;
        border-color: #1ccea2;
    }
`
const ErrorMessage = styled.div`
    color: red;
`
const Table = styled.table`
    width: 100%;
    border-spacing: 0;
    border: solid 1px #118769;
    margin: 40px 0;
`
const TableTh = styled.th`
    background-color: #1ccea2;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    border: solid 1px #118769;
`
const TableTr = styled.tr`
    height: 70px;
`
const TableTd = styled.td`
    border: solid 1px #118769;
`
const ButtonDel = styled.button`
    padding: 5px 15px;
    background-color: #19b58e;
    border-color: #19b58e;
    font-size: 14px;
    border-radius: 4px;
    color: white;
    outline: none;
    margin: 0 auto;
    display: block;
    &:hover {
        background-color: #1ccea2;
        border-color: #1ccea2;
    }
`
const Sum = styled.div`
    font-size: 18px;    
    span {
        font-weight: 600;
    }
`

class Expenses extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            errorTitle: '',
            errorAmount: '',
            errorForm: '',
            amountPLN: '',
            expenseArr: [],
            exchangeRate: 4.382,
            sumPln: 0
        };
      }

    updateText = (e: any) => {
        const text = e.target.value;
        this.setState({
            title: text
        });
    }
    updateRate = (e: any) => {
        var rate = Math.round(e.target.value * 1000)/1000;
        this.setState({
            exchangeRate: rate
        });
    }

    updateAmountPLN = (e: any) => {
        const amountPLN =  e.target.value;
        this.setState({
            amountPLN: amountPLN
        });
    }

    isNotNumber = (number) => {
        var myPattern = "^[0-9]+(.[0-9]{1,2})?$";
        var myRegExp = new RegExp(myPattern);
        var validation = myRegExp.test(number);
        return !validation;
    }

    addExpense = () => {
        var uniqueId = function() {
            return 'id-' + Math.random().toString(36).substr(2, 16);
        };
        this.setState({
            errorTitle: '',
            errorForm: '',
            errorAmount: ''
        });
        if((this.state.title.length > 0) && (this.state.amountPLN.length > 0)) {
            if(this.state.title.length < 5) {
                this.setState({
                    errorTitle: 'Title should have at least 5 characters.'
                }); 
            } else if(this.isNotNumber(this.state.amountPLN)) {
                this.setState({
                    errorAmount: 'Invalid Number. Amount should have at most two digits after the decimal point.'
                }); 
            } else {
                var newState = this.state;
                var updatedArray = newState.expenseArr.slice();
                var numberAmount = parseInt(newState.amountPLN*100)/100;
                updatedArray.push({
                    title: newState.title,
                    amountPLN: numberAmount,
                    id: uniqueId() 
                })
                var sumPln = numberAmount + this.state.sumPln;
                newState.expenseArr = updatedArray;     
                newState.title ='';
                newState.amountPLN ='';
                newState.errorTitle ='';
                newState.errorForm = '';
                newState.errorAmount = '';
                newState.sumPln = sumPln;          
                this.setState(newState);
            }
        } else {
        this.setState({
            errorForm: 'All fields should be filled out.'
        });
        }
    }

    removeExpense = (itemID) => {
        for(var i=0; i < this.state.expenseArr.length; i++ ) {
            if(this.state.expenseArr[i].id === itemID) {
                var newState = this.state;
                var updatedArray = newState.expenseArr.slice();
                newState.sumPln = newState.sumPln - newState.expenseArr[i].amountPLN;              
                updatedArray.splice(i, 1);
                newState.expenseArr = updatedArray;  
                this.setState(newState);

            }
        }
    }

    render() {
        return (
        <Content>
            <Header>
                <Span>List of expenses</Span>
                <Rate>
                    <LabelRate>
                        1 EUR = 
                    </LabelRate>  
                    <InputRate
                    id="rate"
                    type="number"
                    placeholder="4.382"
                    onChange={this.updateRate}
                    />                  
                </Rate>
            </Header>
            <div>
                <div>
                    <Label>Title of transaction</Label>
                    <Input
                        id="title"
                        type="text"
                        onChange={this.updateText}
                        value={this.state.title}
                        placeholder="Title of transaction"
                    />
                </div>
                <div>
                    <Label>Amount (in PLN)</Label>
                    <Input
                        id="amount"
                        type="text"
                        onChange={this.updateAmountPLN}
                        value={this.state.amountPLN}
                        placeholder="0.00"
                    />
                </div>
                <Button onClick={this.addExpense}>Add</Button>
                <ErrorMessage>{this.state.errorForm}</ErrorMessage>
                <ErrorMessage>{this.state.errorTitle}</ErrorMessage>
                <ErrorMessage>{this.state.errorAmount}</ErrorMessage>
            </div>
            <div>
            <Table>
                <thead>
                    <tr>
                        <TableTh>Title</TableTh>
                        <TableTh>Amount (PLN)</TableTh>
                        <TableTh>Amount (EUR)</TableTh>
                        <TableTh>Options</TableTh>
                    </tr> 
                </thead>
                <tbody>
                    {this.state.expenseArr.map(item => (
                    <TableTr key={item.id}>
                        <TableTd>{item.title}</TableTd>
                        <TableTd>{item.amountPLN}</TableTd>
                        <TableTd>{Math.round((item.amountPLN * this.state.exchangeRate) * 100)/100}</TableTd>
                        <TableTd>
                            <ButtonDel onClick={() => this.removeExpense(item.id)}>Delete</ButtonDel>
                        </TableTd>
                    </TableTr>
                        ))}
                </tbody>
            </Table>
                
            </div>
            <Sum>
                <span>SUM: </span>{this.state.sumPln} PLN, {Math.round((this.state.sumPln * this.state.exchangeRate) * 100)/100} EUR
            </Sum>
        </Content>
        );
    }
}

export default Expenses;
