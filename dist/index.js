"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_toolkit_1 = require("actions-toolkit");
const run_action_1 = __importDefault(require("./run-action"));
const validate_parameters_1 = __importDefault(require("./validations/validate-parameters"));
const parameters_schema_1 = __importDefault(require("./parameters-schema"));
actions_toolkit_1.Toolkit.run((tools) => __awaiter(void 0, void 0, void 0, function* () {
    tools.log.info('Validating parameters...');
    (0, validate_parameters_1.default)(tools, parameters_schema_1.default);
    try {
        tools.log.info('Running the action...');
        yield (0, run_action_1.default)(tools);
    }
    catch (error) {
        tools.log.info('Unexpected error happened when action was running: ', error);
    }
}), {
    event: [
        'pull_request.opened',
    ],
    secrets: ['GITHUB_TOKEN'],
});
