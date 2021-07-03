import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchCountryData } from '../api/IndexApi';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    // minWidth: 300,
    width: '80%',
    backgroundColor: 'white',
  
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CountrySelect({ handleCountryChange }) {

  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setCountryData(await fetchCountryData());
    }
    fetchApi();

  }, [setCountryData]);

  const classes = useStyles();

  const handleChange = (event) => {
    handleCountryChange(event.target.value)
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Select Country</InputLabel>
        <Select
          native
          defaultValue=""
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          <option value=''>Global</option>
          {countryData.map((country, ind) => <option key={ind} value={country}>{country}</option>)}
        </Select>
      </FormControl>

    </div>
  );
}
