/*!
 * globalModule
 * Repository for foundry agnostic modules.
 *
 * Copyright (c) 2011 Jason Ramos
 * www.stackideas.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function() {

	var self = window["globalModule"] = function(name, factory) {

		if (name==undefined) return;

		if (factory==undefined) {
			return self.registry[name];
		};

		var module = self.registry[name] = {

			name: name,

			factory: factory,

			exportTo: function(context) {

				return self.export(module, context);
			}
		};

		// Temporarily use this because the new pub/sub doesn't look through window anymore.
		var $ = window["Foundry/2·0"];

		self.export(module, $);
	};

	// Add any existing foundry loaded before this to the list
	self.registry = {};

	self.export = function(module, context) {

		var module = (typeof module !== "object") ? self.registry[module] : module;

		if (module !== undefined) {

			return context.module(module.name.replace("2.0/",""), module.factory);
		}
	};

	return self;

})();
