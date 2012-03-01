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

window.globalModule = (function() {

	var self = function(name, factory) {

		var module = self.registry[name] = {

			name: name,

			factory: factory,

			exportTo: function(context) {

				return self.export(module, context);
			}
		};

		// Go through the list of foundry and see which one is expecting it
		for ($ in self.Foundry) {

			if ($.isExpecting(module.name)) {

				self.export(module, $);
			}
		}
	};

	// Add any existing foundry loaded before this to the list
	self.registry = {};

	self.Foundry = {};

	for (prop in window) {

		if (prop.indexOf("Foundry/")!=0) return;

		self.Foundry[prop] = window[prop];
	}

	self.export = function(module, context) {

		var module = (typeof module !== "object") ? self.registry[module] : module;

		if (module !== undefined) {

			return context.module(module.name, module.factory);
		}
	};

	return self;

})();
