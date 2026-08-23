# Systems & HPC Roadmap Draft

Status: Draft. This detailed outline is intentionally not published on the website.

The public Mermaid roadmap should remain high-level, showing only **Systems & HPC**, **Linux Systems**, and **High-Performance Computing**.

## Linux Systems

- Linux distributions and environments
- Processes, scheduling, and CPU states
- Virtual memory, pages, and swapping
- I/O fundamentals
- Filesystems and storage
- Linux networking

## Commonly Used Linux System Calls

Treat this as a practical map rather than an exhaustive API list. Distinguish direct kernel system calls from libc wrappers, and check architecture and kernel-version differences.

### Processes and execution

- `clone`, `fork`, and `vfork`
- `execve`
- `wait4` and `waitid`
- `exit` and `exit_group`
- `getpid`, `gettid`, and `getppid`

### Files, filesystems, and I/O

- `openat` and `close`
- `read`, `write`, `pread64`, and `pwrite64`
- `readv` and `writev`
- `lseek`
- `fstat` and `statx`
- `getdents64`
- `fsync` and `fdatasync`
- `ioctl`
- `io_uring_setup`, `io_uring_enter`, and `io_uring_register`

### Virtual memory and NUMA

- `mmap` and `munmap`
- `mprotect`
- `brk`
- `madvise`
- `mlock` and `munlock`
- `mbind`, `set_mempolicy`, and `get_mempolicy`
- `move_pages`

### Scheduling, synchronization, and signals

- `futex`
- `sched_yield`
- `sched_setaffinity` and `sched_getaffinity`
- `rt_sigaction` and `rt_sigprocmask`
- `kill` and `tgkill`

### Networking and event polling

- `socket`, `bind`, `listen`, and `accept4`
- `connect`
- `sendmsg` and `recvmsg`
- `setsockopt` and `getsockopt`
- `epoll_create1`, `epoll_ctl`, and `epoll_wait`

### Time and timers

- `clock_gettime`
- `nanosleep` and `clock_nanosleep`
- `timerfd_create` and `timerfd_settime`

### Namespaces and security

- `mount` and `umount2`
- `unshare` and `setns`
- `prctl`
- `seccomp`
- `capget` and `capset`

### Observability and performance

- `ptrace`
- `perf_event_open`
- `bpf`

Study these interfaces with `man 2`, `strace`, `strace -c`, and `perf trace`. Trace small programs first, then compare compute-heavy, I/O-heavy, networked, and parallel workloads.

## Hardware Architecture

- CPU architecture
- Caches and memory hierarchy
- NUMA systems
- GPUs and accelerators
- Storage hardware
- Network interconnects

## Performance Engineering

- Reading `top` and `htop`
- System observation with `vmstat`, `iostat`, and related tools
- Profiling with `perf`
- Benchmark design and methodology
- CPU and GPU benchmarking
- Disk read/write benchmarking
- Network benchmarking
- Identifying bottlenecks without drawing conclusions from a single metric

## Parallel & Distributed Computing

- Concurrency versus parallelism
- Processes and threads
- SIMD and vectorization
- Shared-memory computing
- Distributed-memory computing
- OpenMP, MPI, and CUDA

## High-Performance Computing

- Cluster architecture
- Workload schedulers and job management
- Compute, storage, and network topology
- Modules, environments, and containers
- Strong and weak scaling
- Communication overhead
- Profiling and optimization
- Connecting Linux, hardware, and parallel-computing concepts in real workloads
