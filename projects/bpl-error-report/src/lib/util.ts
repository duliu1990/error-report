import { isFunction } from 'util';
import { ERROR_ORIGINAL_ERROR, ERROR_TYPE, ERROR_DEBUG_CONTEXT, ERROR_LOGGER } from './errors';
import { DebugContext } from '@angular/core/src/view';

export function isOBJByType(o, type): boolean {
    return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
}

export function isOBJ(obj): boolean {
    let type = typeof obj;
    return type === "object" && !!obj;
}

export function isEmpty(obj) {
    if (obj === null) return true;
    if (isOBJByType(obj, "Number")) {
        return false;
    }
    return !obj;
}

export function isRepeat(error, submitErros: any[], repeat) {
    if (!isOBJ(error))
        return true;

    let msg = error.message;
    let addedErrors = submitErros.filter(el => el.message == msg);

    let times = (addedErrors == undefined) ? 0 : addedErrors.length;
    return times > repeat;
}

export function report_log_tostring(error, index) {
    var param = [];
    var params = [];
    var stringify = [];
    if (isOBJ(error)) {
        for (var key in error) {
            var value = error[key];
            if (!isEmpty(value) && !isFunction(value)) {
                if (isOBJ(value)) {
                    try {
                        value = JSON.stringify(value);
                    } catch (err) {
                        value = "[detect value stringify error] " + err.toString();
                    }
                }
                stringify.push(key + ":" + value);
                param.push(key + "=" + encodeURIComponent(value));
                params.push(key + "[" + index + "]=" + encodeURIComponent(value));
            }
        }
    }

    // msg[0]=msg&target[0]=target -- combo report
    // msg:msg,target:target -- ignore
    // msg=msg&target=target -- report with out combo
    return [params.join("&"), stringify.join(","), param.join("&")];
}

export function getType(error: Error): Function {
    return (error as any)[ERROR_TYPE];
}

export function getDebugContext(error: Error): DebugContext {
    return (error as any)[ERROR_DEBUG_CONTEXT];
}

export function getOriginalError(error: Error): Error {
    return (error as any)[ERROR_ORIGINAL_ERROR];
}

export function getErrorLogger(error: Error): (console: Console, ...values: any[]) => void {
    return (error as any)[ERROR_LOGGER] || defaultErrorLogger;
}


function defaultErrorLogger(console: Console, ...values: any[]) {
    (<any>console.error)(...values);
}
