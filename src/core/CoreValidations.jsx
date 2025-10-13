import * as yup from 'yup'

const mailPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const phoneNoPattern = /^\d{10}$/
export default class CoreValidations{

    required = ()=>{
        return yup.string().required('This is mandatory.')
    }

    selectValidation = ()=>{
        return yup.string().required('Please select any one option.')
    }

    stringValidation = (min, max)=>{
        let schemaBuilder = yup.string();
        schemaBuilder = schemaBuilder.required('This is mandatory.');
        if (min !== null && min !== undefined)
            schemaBuilder = schemaBuilder.min(min,`Length should not be less than ${min} characters.`);
        if (max !== null && max !== undefined)
            schemaBuilder = schemaBuilder.max(max,`Length should not be greater than ${max} characters.`);
        return schemaBuilder;
    }

    numberValidation = (min, max, decimal=0)=>{
        let schemaBuilder = yup.string();
        schemaBuilder = schemaBuilder.required('This is mandatory.');
        if(min !== null && min !== undefined)
            schemaBuilder = schemaBuilder.test('',`Number should be greater than ${min}.`,async (value)=>{
                return +min < +value
            })
        if(max !== null && max !== undefined)
            schemaBuilder = schemaBuilder.test('',`Number should be Less than ${max}.`,async (value)=>{
                return +max > +value
            })
        if(decimal === 0)
            schemaBuilder = schemaBuilder.test('',`Decimals are not allowed.`,async (value)=>{
                const regex = new RegExp(`^\\d+(\\.\\d{0,${decimal}})?$`);
                return regex.test(value);
            })
        if(decimal !== null && decimal !== 0)
            schemaBuilder = schemaBuilder.test('decimal-places',`Only ${decimal} decimal value are allowed.`,
            async (value) => {
              if (value === undefined || value === null) return true;
              const regex = new RegExp(`^\\d+(\\.\\d{1,${decimal}})?$`);
              return regex.test(value);
            });
        return schemaBuilder;
    }

    numberValidationLength = (min, max)=>{
        let schemaBuilder = yup.string();
        schemaBuilder = schemaBuilder.required('This is mandatory.');
        const numberLength = new RegExp(`^\\d{${min},${max}}$`);
        schemaBuilder = schemaBuilder.test('',`Length should be between ${min} - ${max}`,async (value)=>{
           return numberLength.test(value)
        })
        return schemaBuilder;
    }

    mailValidation = ()=>{
        let schemaBuilder = yup.string();
        schemaBuilder = schemaBuilder.required('This is mandatory.');
        schemaBuilder = schemaBuilder.test('','Invalid Mail Id',async (value)=>{
           return mailPattern.test(value)
        })
        return schemaBuilder;
    }

    phoneNoValidation = ()=>{
        let schemaBuilder = yup.string();
        schemaBuilder = schemaBuilder.required('This is mandatory.');
        schemaBuilder = schemaBuilder.test('','Invalid Phone Number',async (value)=>{
           return phoneNoPattern.test(value)
        })
        return schemaBuilder;
    }

    dateValidation = ()=>{
        let schemaBuilder = yup.string();
        schemaBuilder = schemaBuilder.required('This is mandatory.');
        return schemaBuilder;
    }

    duplicateValidation = (min=null,max=null,list=[],key='',except='')=>{
        let schemaBuilder = yup.string();
        schemaBuilder = schemaBuilder.required('This is mandatory.');
        if (min !== null && min !== undefined)
            schemaBuilder = schemaBuilder.min(min,`Length should not be less than ${min} characters.`);
        if (max !== null && max !== undefined)
            schemaBuilder = schemaBuilder.max(max,`Length should not be greater than ${max} characters.`);
        schemaBuilder = schemaBuilder.test('','Value already taken.',async (value)=>{
            if(key !== '' && key !== undefined && key !== null){
                return !list.filter((e)=>(e[key]).toLowerCase() === (value).toLowerCase() && (except).toLowerCase() !== (value).toLowerCase()).length
            }else{
                return !list.includes(value) && except !== value
            }
        })
        return schemaBuilder;
    }

    noValidations = ()=>{
        let schemaBuilder = yup.string();
        return schemaBuilder;
    }
    
}