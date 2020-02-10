import { TemplateResult } from 'lit-html'
import { DirectiveFunction } from '@aggre/ullr/directive'

export type ViewTemplate = () => TemplateResult | DirectiveFunction
