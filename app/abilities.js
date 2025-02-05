const { AbilityBuilder, Ability } = require('@casl/ability');

let ANONYMOUS_ABILITY;

function defineAbilityFor(user) {
  if (user) {
    return new Ability(defineRulesFor(user));
  }

  ANONYMOUS_ABILITY = ANONYMOUS_ABILITY || new Ability(defineRulesFor({}));
  return ANONYMOUS_ABILITY;
}

function defineRulesFor(user) {
  const builder = new AbilityBuilder(Ability);

  switch (user.role) {
    case 'admin':
      defineAdminRules(builder);
      defineAnonymousRules(builder);
      defineWriterRules(builder);
      break;
    case 'write':
      defineAnonymousRules(builder);
      defineWriterRules(builder);
      break;
    default:
      defineAnonymousRules(builder);
      break;
  }

  return builder.rules;
}

function defineAdminRules({ can }) {
  can('admin', '/c');
}

function defineWriterRules({ can }) {
  can(['write'], [ '/b']);
}

function defineAnonymousRules({ can }) {
  can('read', ['/a']);
}

module.exports = {
  defineRulesFor,
  defineAbilityFor,
};