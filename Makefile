
MOCHA_TEST_URL ?= http://localhost:3000
HEADLESS_MOCHA_FLAGS = --cwd example

TEST_DIR = example/test

include tasks/*.mk
