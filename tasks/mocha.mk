DIRNAME := $(dir $(lastword $(MAKEFILE_LIST)))
PATH := $(DIRNAME)../bin:$(PATH)

# Mocha Makefile Recipe
# ---------------------
#
# Include this file into your project Makefile to get any targets defined below.
#
#	 	include node_modules/front-tests/tasks/*.mk
#
# Configure below options prior to the include to match your setup.

# Location of the test directory and files to watch
TEST_DIR   ?= test
TEST_FILES ?= $(shell find $(TEST_DIR) -name '*.js' -o -name '*.html')

# The URL to load
MOCHA_TEST_URL ?= http://localhost:3000

# HEADLESS_MOCHA_FLAGS = --noserver
HEADLESS_MOCHA_FLAGS ?=

# Path to the xUnit XML report for mocha test suite
MOCHA_REPORT ?= reports/mocha.xml

# The reporter to use with `mocha` target
MOCHA_REPORTER ?= spec

mocha:
	@echo ... Running $@ ...
	headless-mocha $(MOCHA_TEST_URL) $(HEADLESS_MOCHA_FLAGS) --reporter $(MOCHA_REPORTER)

mocha-ci:
	@echo ... Running $@ ...
	@mkdir -p $(dir $(MOCHA_REPORT))
	@echo ... Results available at: $(MOCHA_REPORT) ...
	headless-mocha $(MOCHA_TEST_URL) $(HEADLESS_MOCHA_FLAGS) --reporter xunit | $(PHANTOMJS_CLEAN) > $(MOCHA_REPORT)

mocha-help:
	@cat $(DIRNAME)../../docs/mocha.md
	@echo
	@echo "### Usage"
	@echo
	headless-mocha --help

$(TEST_DIR): $(TEST_FILES)
	@echo -e >&2 "\n... Changed $? ..."
	@echo >&2 "... Retrigger mocha ..."
	@touch $@
	$(MAKE) mocha

# watch -q make mocha-watch
mocha-watch: $(TEST_DIR)

.PHONY: mocha mocha-ci mocha-help mocha-watch
