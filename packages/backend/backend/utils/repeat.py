import asyncio
from collections.abc import AsyncIterator, Awaitable, Callable
from contextlib import asynccontextmanager
from typing import Annotated

_Task = Callable[[], Awaitable[None]]
_Delay = Annotated[float, "seconds"]


class RepeatTask:
    def __init__(self, task: _Task, delay: _Delay) -> None:
        self._stop = False
        self._delay = delay
        self._task = asyncio.create_task(self._repeat(task))

    async def _repeat(self, task: _Task) -> None:
        while not self._stop:
            await task()
            await asyncio.sleep(delay=self._delay)

    async def stop(self) -> None:
        self._stop = True
        await self._task


@asynccontextmanager
async def repeat_task(task: _Task, delay: _Delay) -> AsyncIterator[None]:
    try:
        repeated_task = RepeatTask(task, delay)
        yield
    finally:
        await repeated_task.stop()
