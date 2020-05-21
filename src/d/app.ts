import { TemplateResult } from 'lit-html'
import { DirectiveFunction } from 'ullr/directive'

export type ViewTemplate = () => TemplateResult | DirectiveFunction
