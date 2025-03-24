export const useResolveTriggerType = (triggerProp)=>(typeof triggerProp === 'string' ? [
        triggerProp
    ] : triggerProp).reduce((result, trigger)=>{
        switch(trigger){
            case 'click':
                result.triggerOnClick = true;
                return result;
            case 'hover':
                result.triggerOnHover = true;
                return result;
            case 'focus':
                result.triggerOnFocus = true;
                return result;
            case 'manual':
                return result;
        }
    }, {
        triggerOnFocus: false,
        triggerOnClick: false,
        triggerOnHover: false
    });

//# sourceMappingURL=useResolveTriggerType.js.map