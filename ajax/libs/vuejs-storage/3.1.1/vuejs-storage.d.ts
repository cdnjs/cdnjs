import Vue from 'vue/types/index'
import { StorageOptionWithFactory } from '../src/interfaces'
import vjs from '../src/index'

export = vjs

declare module 'vue/types/options' {
	interface ComponentOptions<V extends Vue> {
		storage?: StorageOptionWithFactory
	}
}
