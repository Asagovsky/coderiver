import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrencyValue, selectCurrencyNames, selectMappedRates, selectOperationType, selectRateId, selectTargetCurrencyValue } from './exchangeSlice';
import { actions } from './exchangeSlice'
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';


const styles = {
    mtop: {
        marginTop: '20px'
    },
    mr: {
        marginRight: '10px'
    }
}

function Exchange() {

    const operationType = useSelector(selectOperationType)
    const targetCurrency = useSelector(selectTargetCurrencyValue);
    const baseCurrency = useSelector(selectBaseCurrencyValue)
    const mappedRates = useSelector(selectMappedRates)
    const rateId = useSelector(selectRateId)
    const currencyNames = useSelector(selectCurrencyNames)
    const dispatch = useDispatch();

    const handleOperationType = ({target:{value}}) => dispatch(actions.handleChangeOperationType(value))


    return (
        <>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Тип Операції</FormLabel>
                    <RadioGroup 
                        row aria-label="gender" 
                        name="gender1" 
                        value={operationType} 
                        onChange={handleOperationType}>
                            <FormControlLabel value="sale" control={<Radio />} label="Продати" />
                            <FormControlLabel value="buy" control={<Radio />} label="Придбати" />
                        </RadioGroup>
                </FormControl>
            </div>
            <div style={styles.mtop}>
                <TextField
                    style={styles.mr}
                    id="outlined-number"
                    label={currencyNames.base}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={targetCurrency} 
                    onChange={({target: {value}}) => dispatch(actions.handleTargetValue(value))}
                />
                <FormControl variant="outlined" style={styles.mr}>
                    <InputLabel id="demo-simple-select-helper-label">Валюти</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={rateId} 
                        label="Валюти"
                        onChange={({target:{value}}) => dispatch(actions.handleChangeRates(value))}
                    >
                        {mappedRates.map(item => 
                            <MenuItem key={item.id} value={item.id}>{item.base_ccy} {item.ccy}</MenuItem> 
                        )}
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-number"
                    label={currencyNames.target}
                    type="number"
                    step='1'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={baseCurrency}  
                    onChange={({target: {value}}) => dispatch(actions.handleBaseValue(value))}
                />
            </div>
            
        </>
    )
}

export default Exchange
