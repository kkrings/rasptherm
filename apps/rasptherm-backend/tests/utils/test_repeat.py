import asyncio

import pytest

from rasptherm_backend.utils.repeat import repeat_task


def test_repeat_task(num_task_calls: int) -> None:
    assert num_task_calls > 1


class SomeTask:
    def __init__(self) -> None:
        self.ncalls = 0

    async def __call__(self) -> None:
        self.ncalls += 1


@pytest.fixture
async def num_task_calls() -> int:
    some_task = SomeTask()

    async with repeat_task(task=some_task, delay=1e-3):
        await asyncio.sleep(delay=2e-3)

    return some_task.ncalls
