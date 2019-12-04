import { component, subscribe, DirectiveFunction } from '@aggre/ullr/directive'
import { TemplateResult, html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { style } from '../../lib/style'
import { BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators'
import { asVar } from '../../lib/style-properties'

export interface Item {
	template: TemplateResult
	selected: boolean
}

export interface SelectBoxItem<T> extends Item {
	data: T
}

export type SelectBoxItems<T> = Array<SelectBoxItem<T>>

export type SelectBoxItemsSubject<T = {}> = BehaviorSubject<SelectBoxItems<T>>

export type SelectBoxHandler<T> = (item: SelectBoxItem<T>) => (e: Event) => void

const toggle = (state: BehaviorSubject<boolean>) => (): void =>
	state.next(!state.value)

export const selectBox = <T>(
	subject: SelectBoxItemsSubject<T>,
	handler: SelectBoxHandler<T>
): DirectiveFunction =>
	component(html`
		${style`
			.selected {
				display: block;
			}
			.list {
				display: none;
				position: absolute;
				top: 100%;
				width: 100%
			}
			.item {
				padding: 1rem;
				cursor: pointer;
			}
			[role=listbox] {
				position: relative;
				border: 1px solid ${asVar('weakColor')};
				border-radius: ${asVar('borderRadius')};
			}
			[opened] {
				border: 0;
				box-shadow: 0 6px 16px #00000040;
			}
			[opened] .selected {
				display: block;
				overflow: hidden;
				border-radius: ${asVar('borderRadius')} ${asVar('borderRadius')} 0 0;
				border-bottom: 1px solid ${asVar('onSurfaceWeakColor')};
			}
			[opened] .list {
				display: block;
				overflow: hidden;
				border-radius: 0 0 ${asVar('borderRadius')} ${asVar('borderRadius')};
			}
			[opened] .item {
				background: ${asVar('surfaceColor')};
				color: ${asVar('onSurfaceColor')};
			}
		`}
		${(state =>
			subscribe(
				state,
				opened => html`
					<div role="listbox" ?opened=${opened} @click=${toggle(state)}>
						<div class="selected">
							${subscribe(subject.pipe(filter(x => x !== undefined)), x =>
								(({ template }) => html`
									<div role="option" aria-selected="true" class="item">
										${template}
									</div>
								`)(x.find(x => x.selected) ?? x[0])
							)}
						</div>
						<div class="list">
							${subscribe(subject.pipe(filter(x => x !== undefined)), x =>
								(items =>
									html`
										${repeat(
											items,
											x =>
												html`
													<div role="option" class="item" @click=${handler(x)}>
														${x.template}
													</div>
												`
										)}
									`)(x)
							)}
						</div>
					</div>
				`
			))(new BehaviorSubject(false))}
	`)
